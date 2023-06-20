import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ProfileSection, ProfileTile, ProfileInfo, ImgUploadBtn, UploadInput, EditForm, Label, Input, Img, ImgIcon } from "./ProfileSettingsStyle";
import { GreenBigButton, UnactiveBigButton } from "../../components/Button/Button";
import uploadFile from "../../assets/images/basicProfileImg.png";
import uploadIcon from "../../assets/images/uploadFile.png";

export default function ProfileSettings() {
  const uploadInputRef = useRef(null);
  const [post, setPost] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // 이미지 URL 상태 추가

  const [image, setImage] = useState(null); // 추후에 다중 이미지로 작업할 때는 image를 배열로!
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [idValid, setIdValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [nameError, setNameError] = useState("");
  const [idError, setIdError] = useState("");

  const handleImgClick = () => {
    uploadInputRef.current.click();
  };

  useEffect(() => {
  }, [post, image]);

  //프로필 사진 업로드
  const handleFile = async (event) => {
    const file = event.target.files[0];
    
    const profile = document.querySelector("#profile"); //1. 접근 (이미지 요소가 변수 안에 담김)
    const url = "https://api.mandarin.weniv.co.kr/" // 2. url요청해오기 
    
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("https://api.mandarin.weniv.co.kr/image/uploadfile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const path = url + data.filename // 3. 이미지 주소
      profile.src = path; // 4. path에 저장해 놓은 값을 불러옴 (실질적 이미지 보여주는 작업)

      setImageUrl(path); // 이미지 URL 업데이트
      setImage(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 사용자 이름 유효성 검사
  const handleNameInput = (event) => {
    const valueName = event.target.value;
    setName(valueName);
    if (valueName.length >= 2 && valueName.length <= 10) {
      setNameError("");
      setNameValid(true);
    } else {
      setNameError("2~10자 이내여야 합니다.");
      setNameValid(false);
    }
  };

  // 계정 유효성 검사
  const handleIdInput = async (event) => {
    const value = event.target.value;
    const postIdValid = await fetch(`https://api.mandarin.weniv.co.kr/user/accountnamevalid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          accountname: value,
        },
      }),
    });
    const json = await postIdValid.json();
    console.log(json);

    const idPattern = /^[A-Za-z0-9._]+$/;
    if (idPattern.test(value)) {
      setId(value);
      setIdError("");
      setIdValid(true);
    } else {
      setId(value); // 입력된 값을 그대로 유지 (첫번째 글자 지워지지 않는 오류 해결)
      setIdError("영문, 숫자, 특수문자(.),(_)만 사용 가능합니다");
      setIdValid(false);
    }
  };

  // 소개 입력란 핸들러
  const handleIntroduceInput = (event) => {
    setIntroduce(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && id && introduce && idValid) {
    }
  };

  return (
    <>
      <ProfileSection>
        <h2 className='a11y-hidden'>프로필 설정</h2>
        <ProfileTile>프로필 설정</ProfileTile>
        <ProfileInfo>나중에 언제든지 변경할 수 있습니다.</ProfileInfo>
        <Label htmlFor="file-sync" className="file-sync"  onClick={handleImgClick}>
          <ImgUploadBtn>
            <Img src={uploadFile} alt="uploadFile" />  
            <ImgIcon src={uploadIcon} alt="업로드아이콘" />   
          </ImgUploadBtn>
        </Label>
        <UploadInput ref={uploadInputRef} id='profile' type="file"  accept=".png, .jpg, .jpeg" multiple hidden onChange={handleFile} />         
        {imageUrl && <img src={imageUrl} alt="프로필 사진" />}
        <EditForm onSubmit={handleSubmit}>
          <Label htmlFor='user-name'>사용자이름</Label>
          <Input id={"user-name"} type={"text"} label={"사용자이름"} placeholder={"2~10자 이내여야 합니다."} value={name} alertMsg={setNameError} onChange={handleNameInput} onBlur={handleNameInput} required />
          {nameError && <p style={{ marginBottom: "2rem", marginTop: "-2.4rem", fontSize: "1.2rem", color: "var(--font-red-color)" }}>{nameError}</p>}
          <Label htmlFor='user-id'>계정 ID</Label>
          <Input id={"user-id"} type={"text"} label={"계정ID"} placeholder={"영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.."} value={id} valid={idValid} alertMsg={setIdError} onChange={handleIdInput} onBlur={handleIdInput} required />
          {idError && <p style={{ marginBottom: "2rem", marginTop: "-2.4rem", fontSize: "1.2rem", color: "var(--font-red-color)" }}>{idError}</p>}
          <Label htmlFor='user-introduce'>소개</Label>
          <Input id={"user-introduce"} type={"text"} label={"소개"} placeholder={"좋아하는 브랜드와 룩을 알려주세요."} value={introduce} onChange={handleIntroduceInput} required />
          <Link to ="/">
            {name && id && introduce ? <GreenBigButton type='submit' contents={"입9팔9 즐기러 가기"} /> : <UnactiveBigButton type='submit' contents={"입9팔9 즐기러 가기"} />}
          </Link>
        </EditForm>
      </ProfileSection>
    </>
  );
}
