import React, { useState } from "react";
import Header from "../../components/HeaderMenu/HeaderMenu";
import { Upload, Form, UploadInput, Img, Label } from "./PostUploadStyle";
import profileImg from "../../assets/images/profileImg.svg";
import uploadFile from "../../assets/images/uploadFile.svg";

export default function PostUpload() {
  const [imagePost, setImagePost] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleImageInput = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    try {
      const response = await fetch("https://api.mandarin.weniv.co.kr/image/uploadfile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setImagePost("https://api.mandarin.weniv.co.kr/" + data.filename);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostUpload = async () => {
    if (!postContent || !imagePost) {
      console.log("내용 또는 이미지를 입력해주세요.");
      return;
    }

    const formData = JSON.stringify({
      post: {
        content: postContent,
        image: imagePost,
      },
    });

    const token = localStorage.getItem("token");

    console.log(token);
    try {
      const response = await fetch("https://api.mandarin.weniv.co.kr/post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  };

  return (
    <>
      <Header handlePostUpload={handlePostUpload} />
      <Upload>
        <h2 className='a11y-hidden'>게시글 작성</h2>
        <Form method='post'>
          <Img src={profileImg} alt='profileImg' />
          <label htmlFor='txt-sync' className='a11y-hidden'>
            게시글 입력창입니다.
          </label>
          <textarea id='txt-sync' cols='40' rows='6' maxLength='140' placeholder='게시글 입력하기...' className='upload-txt' value={postContent} onChange={handleContentChange}></textarea>
          <Label htmlFor='file-sync' className='file-sync'>
            <img src={uploadFile} alt='uploadFile' />
          </Label>
          <UploadInput type='file' id='file-sync' accept='.png, .jpg, .jpeg' multiple onChange={handleImageInput} hidden />
        </Form>
        <div className='img-container'>{imagePost && <img src={imagePost} alt='Uploaded' />}</div>
        <button type='button' onClick={handlePostUpload}>
          게시글 업로드
        </button>
      </Upload>
    </>
  );
}
