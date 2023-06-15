import React from "react";
import profileImg from "../../assets/images/profileImg.svg";
import Header from "../../components/HeaderMenu/HeaderMenu";
import { Upload, Form, UploadInput, Img } from "./PostUploadStyle";

export default function PostUpload() {
  return (
    <>
      <Header />
      <Upload>
        <h2 className='a11y-hidden'>게시글작성</h2>
        <Form method='post'>
          <Img src={profileImg} alt='profileImg' />
          <label htmlFor='txt-sync' className='a11y-hidden'>
            게시글 입력창입니다.
          </label>
          <textarea id='txt-sync' cols='40' rows='6' maxLength='140' placeholder='게시글 입력하기...' className='upload-txt'></textarea>
          <label htmlFor='file-sync' className='upload-img'>
            이미지 업로드 버튼입니다.
          </label>
          <UploadInput type='file' id='file-sync' accept='.png, .jpg, .jpeg' />
        </Form>
        <div className='img-container'></div>
      </Upload>
    </>
  );
}
