import React, { useState, useEffect, useRef } from "react";
import { ProfileSection, ProfileTile, ProfileInfo, ImgUploadBtn, UploadInput, EditForm, Label, Input, Img, ImgIcon } from "./SignUpProfileStyle";
import { useLocation, useNavigate } from "react-router-dom";
import BtnStyle from "../../../components/Button/Button";
import basicProfileImage from "../../../assets/images/basicProfileImg.png";
import uploadIcon from "../../../assets/images/uploadFile.png";
import Header from "../../../components/Header/Header";
import { Button } from "../../UploadProduct/UploadProductStyle";

export default function ProfileSettings({ email, password }) {
  const navigate = useNavigate();
  const uploadInputRef = useRef(null);
  const [post, setPost] = useState("");
  const [image, setImage] = useState(basicProfileImage);
  const [imageUrl, setImageUrl] = useState(""); // 이미지 URL 상태 추가

  // 추후에 다중 이미지로 작업할 때는 image를 배열로!
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [idValid, setIdValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [nameError, setNameError] = useState("");
  const [idError, setIdError] = useState("");
  const location = useLocation();
  const isModify = location.pathname.includes("modify");

  const modifyUserProfile = () => {
    fetch(`https://api.mandarin.weniv.co.kr/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: name,
          accountname: id,
          intro: introduce,
          image: imageUrl,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        localStorage.setItem("username", json.user.username);
        navigate(`/profile/${json.user.accountname}`);
      });
  };

  useEffect(() => {
    const isModify = location.pathname.includes("modify");

    if (isModify) {
      fetch(`https://api.mandarin.weniv.co.kr/user/myinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json.user);
          setId(json.user.accountname);
          setName(json.user.username);
          setIntroduce(json.user.intro);
          setImageUrl(json.user.image);
        });
    }
  }, []);

  const handleImgClick = () => {
    uploadInputRef.current.click();
  };

  //프로필 사진 업로드
  const handleFile = async (event) => {
    const file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      reader.result && setImage(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);

    const profile = document.querySelector("#profile");
    const url = "https://api.mandarin.weniv.co.kr/";

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("https://api.mandarin.weniv.co.kr/image/uploadfile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      console.log(data);
      const path = url + data.filename;
      setImageUrl(path);
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
    setId(value); // 입력된 값을 그대로 유지 (첫번째 글자 지워지지 않는 오류 해결)
    const idPattern = /^[A-Za-z0-9._]+$/;
    if (idPattern.test(value)) {
      setIdError("");
      setIdValid(true);
      setId(value);
      try {
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
      } catch (error) {
        console.error(error);
      }
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

  // 회원가입 api 요청 보내기
  const url = "https://api.mandarin.weniv.co.kr";
  const join = async () => {
    const userData = {
      user: {
        email: email,
        password: password,
        image: imageUrl,
        username: name,
        accountname: id,
        intro: introduce,
      },
    };
    userData.user.intro = introduce || "";

    try {
      const res = await fetch(url + "/user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (name && id && introduce && idValid) {
      await join(); // 이미지 업로드 및 회원가입 API 요청
      navigate("/login"); // 페이지 이동
    }
  };

  return (
    <>
      {isModify && (
        <Header type="submitHeader">
          <Button onClick={() => modifyUserProfile()} disabled={name && id && introduce ? false : true} form="profileForm">
            저장
          </Button>
        </Header>
      )}

      <ProfileSection>
        <h2 className="a11y-hidden">프로필 설정</h2>
        <ProfileTile>{isModify ? "프로필 수정" : "프로필 설정"}</ProfileTile>
        {!isModify && <ProfileInfo>나중에 언제든지 변경할 수 있습니다.</ProfileInfo>}
        <Label htmlFor="file-sync" className="file-sync" onClick={handleImgClick}>
          <ImgUploadBtn>
            <Img src={imageUrl || image} alt="uploadFile" />
            <ImgIcon src={uploadIcon} alt="업로드아이콘" />
          </ImgUploadBtn>
        </Label>
        <UploadInput ref={uploadInputRef} id="profile" type="file" accept=".png, .jpg, .jpeg" multiple hidden onChange={handleFile} />

        <EditForm onSubmit={handleSubmit} id="profileForm">
          <Label htmlFor="user-name">사용자이름</Label>
          <Input id={"user-name"} type={"text"} label={"사용자이름"} minLength={2} maxLength={10} placeholder={"2~10자 이내여야 합니다."} value={name} alertMsg={setNameError} onChange={handleNameInput} onBlur={handleNameInput} required />
          {nameError && <p style={{ marginBottom: "2rem", marginTop: "-2.4rem", fontSize: "1.2rem", color: "var(--font-red-color)" }}>{nameError}</p>}
          <Label htmlFor="user-id">계정 ID</Label>
          <Input id={"user-id"} type={"text"} label={"계정ID"} placeholder={"영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.."} value={id} valid={idValid} alertMsg={setIdError} onChange={handleIdInput} onBlur={handleIdInput} required />
          {idError && <p style={{ marginBottom: "2rem", marginTop: "-2.4rem", fontSize: "1.2rem", color: "var(--font-red-color)" }}>{idError}</p>}
          <Label htmlFor="user-introduce">소개</Label>
          <Input id={"user-introduce"} type={"text"} label={"소개"} placeholder={"좋아하는 브랜드와 룩을 알려주세요."} value={introduce} onChange={handleIntroduceInput} required />

          {name && id && introduce
            ? !isModify && (
                <BtnStyle onClick={isModify ? modifyUserProfile : handleForm} type="submit">
                  입9팔9 즐기러 가기
                </BtnStyle>
              )
            : !isModify && (
                <BtnStyle type="submit" disabled>
                  입9팔9 즐기러 가기
                </BtnStyle>
              )}
        </EditForm>
      </ProfileSection>
    </>
  );
}
