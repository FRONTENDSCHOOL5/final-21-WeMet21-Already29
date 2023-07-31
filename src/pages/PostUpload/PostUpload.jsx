import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { Upload, Form, UploadInput, Label, Textarea, ImgWrapper } from "./PostUploadStyle";
import uploadFile from "../../assets/images/uploadFile.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import union from "../../assets/images/Union.png";
import fetchApi from "../../utils/fetchApi";

export default function PostUpload() {
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const { id: postId } = useParams();
  const isModify = !!postId;
  const imageArray = image && image.split(",");
  const baseUrl = "https://api.mandarin.weniv.co.kr/";
  const postData = {
    post: {
      content: post,
      image: image,
    },
  };
  console.log(image);
  console.log(imageArray);

  const navigate = useNavigate();

  const getPostData = () => {
    fetchApi(`post/${postId}`).then((res) => {
      setPost(res.post.content);
      if (res.post.image) setImage(res.post.image);
    });
  };

  useEffect(() => {
    if (isModify) {
      getPostData();
    }
  }, []);

  const handleUpload = async () => {
    console.log(postData);
    if (!post) {
      alert("내용을 입력해주세요.");
    } else if (isModify) {
      fetchApi(`post/${postId}`, "PUT", JSON.stringify(postData)).then(() => navigate(`/post/${postId}`));
    } else if (!isModify) {
      fetchApi("post", "POST", JSON.stringify(postData)).then((res) => navigate(`/post/${res.post.id}`));
    }
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
      if (image && imageArray.length >= 3) {
        alert("너무 많아요");
        return;
      }
      setImage((prev) => (prev ? prev + `,${baseUrl}${data.filename}` : `${baseUrl}${data.filename}`));
    } catch (error) {
      console.error(error);
    }
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [post]);

  const imageDeleteHandler = (index) => {
    const target = imageArray[index];
    setImage(imageArray.filter((item) => item !== target).join(","));
  };

  return (
    <>
      <Header type="submitHeader" handlePostUpload={handleUpload}>
        {post || image ? (
          <Button category="basic" width="9rem" height="3.2rem" type="submit" onClick={handleUpload}>
            업로드
          </Button>
        ) : (
          <Button category="basic" width="9rem" height="3.2rem" type="submit" disabled="disabled">
            업로드
          </Button>
        )}
      </Header>
      <Upload>
        <h2 className="a11y-hidden">게시글 작성</h2>

        <Form>
          <label htmlFor="txt-sync" className="a11y-hidden">
            게시글 입력창입니다.
          </label>
          <Textarea id="txt-sync" placeholder="게시글 입력하기..." className="upload-txt" value={post} onChange={(e) => setPost(e.target.value)} ref={textareaRef} maxLength={700}></Textarea>
          <div>
            <Label htmlFor="file-sync" className="file-sync">
              <img src={uploadFile} alt="uploadFile" />
            </Label>
          </div>
          <UploadInput type="file" id="file-sync" accept=".png, .jpg, .jpeg" multiple hidden onChange={handleFile} />
        </Form>
        {image &&
          imageArray.map((item, index) => {
            return (
              <ImgWrapper key={index}>
                <img src={item} alt="게시물 이미지" />
                <button type="button" onClick={() => imageDeleteHandler(index)}>
                  <img src={union} alt="삭제" />
                </button>
              </ImgWrapper>
            );
          })}
      </Upload>
    </>
  );
}
