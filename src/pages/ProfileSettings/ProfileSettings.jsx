import React, { useState } from "react";
import { ProfileSection, ProfileTile, ProfileInfo, EditWrap, UploadButton, EditForm, Label, Input } from "./ProfileSettingsStyle";
import { GreenBigButton, UnactiveBigButton } from "../../components/Button/Button";
import uploadImg from "../../assets/images/uploadImg.png";
export default function ProfileSettings() {
  const [productImage, setproductImage] = useState("");
  const [productImageUrl, setproductImageUrl] = useState("https://api.mandarin.weniv.co.kr/1686629045637.png");

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [idValid, setIdValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [nameError, setNameError] = useState("");
  const [idError, setIdError] = useState("");

  //프로필 사진 업로드
  const handleImgInput = async (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    const formData = new FormData();
    const userImg = e.target.files[0];
    if (userImg.size > 1000000) {
      alert("1MB 미만의 이미지 파일만 업로드 가능합니다.");
      return;
    }

    const fileNamesplitArray = userImg.name.split(".");
    const fileExtension = fileNamesplitArray[fileNamesplitArray.length - 1];
    const fileExtensionValues = ["jpg", "gif", "png", "jpeg", "bmp", "tif", "heic"];

    if (!fileExtensionValues.includes(fileExtension)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    setproductImage(e.target.value);
    formData.append("image", userImg);

    const res = await fetch("https://api.mandarin.weniv.co.kr/image/uploadfile", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    console.log(json);
    setproductImageUrl(`https://api.mandarin.weniv.co.kr/${json.filename}`);
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
        <EditWrap>
          <UploadButton type='file' onChange={handleImgInput}>
            <img style={{ width: "11rem" }} src={uploadImg} alt='프로필 이미지 업로드 버튼입니다.' />
          </UploadButton>
        </EditWrap>
        <EditForm onSubmit={handleSubmit}>
          <Label htmlFor='user-name'>사용자이름</Label>
          <Input id={"user-name"} type={"text"} label={"사용자이름"} placeholder={"2~10자 이내여야 합니다."} value={name} alertMsg={setNameError} onChange={handleNameInput} onBlur={handleNameInput} required />
          {nameError && <p style={{ marginBottom: "2rem", marginTop: "-2.4rem", fontSize: "1.2rem", color: "var(--font-red-color)" }}>{nameError}</p>}
          <Label htmlFor='user-id'>계정 ID</Label>
          <Input id={"user-id"} type={"text"} label={"계정ID"} placeholder={"영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.."} value={id} valid={idValid} alertMsg={setIdError} onChange={handleIdInput} onBlur={handleIdInput} required />
          {idError && <p style={{ marginBottom: "2rem", marginTop: "-2.4rem", fontSize: "1.2rem", color: "var(--font-red-color)" }}>{idError}</p>}
          <Label htmlFor='user-introduce'>소개</Label>
          <Input id={"user-introduce"} type={"text"} label={"소개"} placeholder={"좋아하는 브랜드와 룩을 알려주세요."} value={introduce} onChange={handleIntroduceInput} required />

          {name && id && introduce ? <GreenBigButton type='submit' contents={"입9팔9 즐기러 가기"} /> : <UnactiveBigButton type='submit' contents={"입9팔9 즐기러 가기"} />}
        </EditForm>
      </ProfileSection>
    </>
  );
}
