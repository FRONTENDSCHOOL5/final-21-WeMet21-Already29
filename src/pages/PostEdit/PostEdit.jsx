import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMultiImage } from "../../hooks/useImage";

import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

import fetchApi from "../../utils/fetchApi";

import uploadFile from "../../assets/images/uploadFile.png";
import union from "../../assets/images/Union.png";

import { Upload, Form, UploadInput, Label, Textarea, ImgWrapper } from "./PostEdit.style";

export default function PostEdit() {
  const [post, setPost] = useState("");
  const { image, setImage, inputImageHandler } = useMultiImage();
  const { id: postId } = useParams();
  const isModify = !!postId;
  const imageArray = image && image.split(",");
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const postData = {
    post: {
      content: post,
      image: image,
    },
  };

  const getPostData = () => {
    fetchApi(`post/${postId}`).then((res) => {
      setPost(res.post.content);
      if (res.post.image) setImage(res.post.image);
    });
  };

  useEffect(() => {
    if (isModify) getPostData();
  }, [isModify]);

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
        <Button category="basic" width="9rem" height="3.2rem" type="submit" onClick={handleUpload} disabled={!post}>
          업로드
        </Button>
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
          <UploadInput type="file" id="file-sync" accept=".png, .jpg, .jpeg" multiple hidden onChange={inputImageHandler} />
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
