import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { Upload, Form, UploadInput, Img, Label, Textarea, Div, ImgWrapper } from "./PostUploadStyle";
import uploadFile from "../../assets/images/uploadFile.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import union from "../../assets/images/Union.png";

export default function PostUpload() {
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams();

  const sendImage = image && typeof image === "object" && image.length > 1 ? image.join(",") : image && typeof image === "object" && image.length === 1 ? image[0] : image;
  console.log(sendImage);

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
        console.log();
        setPost(json.post.content);
        setImage(json.post.image ? json.post.image.split(",") : null);
      });
  };

  useEffect(() => {
    if (id) {
      getPostData();
    }
  }, []);

  const modifyPostHandler = () => {
    console.log("실행");
    fetch(`https://api.mandarin.weniv.co.kr/post/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        post: {
          content: post,
          image: sendImage,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        console.log("에러인가");
        navigate(`/post/${id}`);
      })
      .catch((e) => console.log(e));
  };

  const handleFile = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("https://api.mandarin.weniv.co.kr/image/uploadfile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImage((prev) => {
        if (prev && typeof prev === "object" && prev.length > 2) {
          alert("이미지는 3장까지 업로드 가능합니다");
          return prev;
        } else if (prev && typeof prev === "object" && prev.length) {
          return [...prev, `https://api.mandarin.weniv.co.kr/${data.filename}`];
        } else if (prev) {
          return [prev, `https://api.mandarin.weniv.co.kr/${data.filename}`];
        } else if (!prev) {
          return `https://api.mandarin.weniv.co.kr/${data.filename}`;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
    if (!post) {
      console.log("내용을 입력해주세요.");
      return;
    }
    console.log("실행");
    const body = {
      post: {
        content: post,
        image: sendImage,
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

  const imageDeleteHandler = (index) => {
    const imageArrayCopy = [...image];
    if (typeof index === "number") {
      imageArrayCopy.splice(index, 1);
      setImage(imageArrayCopy);
    } else {
      setImage(null);
    }
  };

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
          <>
            {typeof image === "object" && image.length > 1 ? (
              image.map((item, index) => {
                return (
                  <ImgWrapper key={index}>
                    <img src={item} alt="게시물 이미지" />
                    <button type="button" onClick={() => imageDeleteHandler(index)}>
                      <img src={union} alt="삭제" />
                    </button>
                  </ImgWrapper>
                );
              })
            ) : (
              <ImgWrapper>
                <img src={image} alt="게시물 이미지" />
                <button type="button" onClick={() => imageDeleteHandler()}>
                  <img src={union} alt="삭제" />
                </button>
              </ImgWrapper>
            )}
          </>
        )}
      </Upload>
    </>
  );
}
