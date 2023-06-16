import React, { useState } from "react";
import Header from "../../components/HeaderMenu/HeaderMenu";
import { Upload, Form, UploadInput, Img, Label } from "./PostUploadStyle";

import profileImg from "../../assets/images/profileImg.svg";
import uploadFile from "../../assets/images/uploadFile.svg";

export default function PostUpload() {
  const [contentText, setContentText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleTextChange = (event) => {
    setContentText(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(Array.from(files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'https://mandarin.api.weniv.co.kr/post';
    const token = localStorage.getItem('Token');

    if (selectedFiles.length > 3) {
      alert('이미지 파일은 최대 3장까지만 가능합니다.');
      return;
    }

    const imgUrls = [];
    for (const file of selectedFiles) {
      const imgUrl = await uploadImage(file);
      imgUrls.push(imgUrl);
    }

    const requestData = {
      post: {
        content: contentText,
        image: imgUrls.join(',')
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post created:', data.post);
        // 여기에서 게시글 작성 후의 처리를 수행할 수 있습니다.
        // 예를 들어, 페이지 이동이나 상태 업데이트 등을 수행할 수 있습니다.
      } else {
        console.error('Failed to create post:', response.status);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const uploadImage = async (file) => {
    // 이미지를 업로드하는 로직을 구현해야 합니다.
    // 이 부분은 이미지 업로드를 위한 API 호출 등으로 구현할 수 있습니다.
    // 예를 들어, FormData를 사용하여 이미지를 서버로 전송하는 방식을 사용할 수 있습니다.
    // 실제 구현 방법은 API 사양과 서버 요구 사항에 따라 달라질 수 있습니다.
    // 이 예시에서는 임시적으로 이미지 파일의 이름을 반환하는 방식으로 구현했습니다.
    return new Promise((resolve) => {
      setTimeout(() => {
        const fileName = file.name;
        resolve(fileName);
      }, 1000);
    });
  };



  return (
    <>
      <Header />
      <Upload>
        <h2 className='a11y-hidden'>게시글작성</h2>
        <Form method='post' onSubmit={handleSubmit}>
          <Img src={profileImg} alt='profileImg' />
          <label htmlFor='txt-sync' className='a11y-hidden'>
            게시글 입력창입니다.
          </label>
          <textarea id='txt-sync' cols='40' rows='6' maxLength='140' placeholder='게시글 입력하기...' className='upload-txt' ></textarea>
          <Label htmlFor='file-sync' className='file-sync' >  
            <img src={uploadFile} alt="uploadFile" />
          </Label>
          <UploadInput type='file' id='file-sync' accept='.png, .jpg, .jpeg' multiple hidden/>
        </Form>
        <div className='img-container'></div>
      </Upload>
    </>
  );
}
