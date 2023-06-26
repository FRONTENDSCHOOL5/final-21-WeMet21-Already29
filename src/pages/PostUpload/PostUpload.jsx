import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { Upload, Form, UploadInput, Img, Label, Textarea, Div, ImgDiv } from "./PostUploadStyle";
import uploadFile from "../../assets/images/uploadFile.png";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function PostUpload() {
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { id } = useParams();

  // test용 post id (8989의 게시글 중 하나)
  // const testPostId = "6493b139b2cb20566360443d";
  const navigate = useNavigate();

  const getPostData = () => {
    fetch(`https://api.mandarin.weniv.co.kr/post/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setPost(json.post.content);
        setImage(json.post.image && json.post.image);
      });
  };

  useEffect(() => {
    if (id) {
      getPostData();
    }
  }, []);

  const modifyPostHandler = () => {
    fetch(`https://api.mandarin.weniv.co.kr/post/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        post: {
          content: post,
          image: image,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        navigate(`/post/${id}`);
      });
  };

  const handleFile = async (event) => {
    const file = event.target.files[0];
    console.log(file);

    const previewImageUrl = URL.createObjectURL(file);
    setPreviewImage(previewImageUrl);

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("https://api.mandarin.weniv.co.kr/image/uploadfile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data.filename);
      setImage(`https://api.mandarin.weniv.co.kr/${data.filename}`);
      // setPreviewImage(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
    if (!post) {
      console.log("내용 또는 이미지를 입력해주세요.");
      return;
    }
    const body = {
      post: {
        content: post,
        image: image ? "https://api.mandarin.weniv.co.kr/" + image.filename : null,
      },
    };
    console.log(body);
    try {
      const response = await fetch("https://api.mandarin.weniv.co.kr/post", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      navigate(`/post/${data.post.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContentChange = (event) => {
    setPost(event.target.value);
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [post]);

  return (
    <>
      <Header type="submitHeader" handlePostUpload={handleUpload}>
        <Button width="12rem" height="3.4rem" margin="0" type="submit" onClick={id ? modifyPostHandler : handleUpload}>
          업로드
        </Button>
      </Header>
      <Upload>
        <h2 className="a11y-hidden">게시글 작성</h2>

        <Form>
          <label htmlFor="txt-sync" className="a11y-hidden">
            게시글 입력창입니다.
          </label>
          <Textarea id="txt-sync" placeholder="게시글 입력하기..." className="upload-txt" value={post} onChange={handleContentChange} ref={textareaRef}></Textarea>
          <Label htmlFor="file-sync" className="file-sync">
            <img src={uploadFile} alt="uploadFile" />
          </Label>
          <UploadInput type="file" id="file-sync" accept=".png, .jpg, .jpeg" multiple hidden onChange={handleFile} />
        </Form>
        {image && (
          <ImgDiv className="img-container">
            <img src={image} alt="Uploaded" />
          </ImgDiv>
        )}
      </Upload>
    </>
  );
}
