import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderMenu/HeaderMenu";
import { Upload, Form, UploadInput, Img, Label, Textarea } from "./PostUploadStyle";
import profileImg from "../../assets/images/profileImg.svg";
import uploadFile from "../../assets/images/uploadFile.svg";

export default function PostUpload() {
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGQ2ZWYzYjJjYjIwNTY2MzM4MGNkNCIsImV4cCI6MTY5MjI2OTM0NCwiaWF0IjoxNjg3MDg1MzQ0fQ.vmWyAAhOQ4qGGHLS-P5Jhp-kChRGeDmlcaWSvZ9i874";

  useEffect(() => {}, [post, image, previewImage]);

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
      console.log(data);
      setImage(data);
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
    console.log(token);
    try {
      const response = await fetch("https://api.mandarin.weniv.co.kr/post", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContentChange = (event) => {
    setPost(event.target.value);
  };

  return (
    <>
      <Header handlePostUpload={handleUpload} />
      <Upload>
        <h2 className="a11y-hidden">게시글 작성</h2>
        <Img src={profileImg} alt="profileImg" />
        <div>
          <Form>
            <label htmlFor="txt-sync" className="a11y-hidden">
              게시글 입력창입니다.
            </label>
            <Textarea id="txt-sync" maxLength="140" placeholder="게시글 입력하기..." className="upload-txt" value={post} onChange={handleContentChange}></Textarea>
            <Label htmlFor="file-sync" className="file-sync">
              <img src={uploadFile} alt="uploadFile" />
            </Label>
            <UploadInput type="file" id="file-sync" accept=".png, .jpg, .jpeg" multiple hidden onChange={handleFile} />
          </Form>
          <div className="img-container">{image && <img src={"https://api.mandarin.weniv.co.kr/" + image.filename} alt="Uploaded" />}</div>
        </div>
      </Upload>
    </>
  );
}
