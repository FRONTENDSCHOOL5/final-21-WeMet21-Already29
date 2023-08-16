import React, { useState, useEffect, useRef, useContext } from "react";
import { ProfileInfo, ImgUploadBtn, UploadInput, EditForm, Label, Img, ImgIcon, ProfileSettingForm, ProfileTitle, ImgDiv } from "./SignUpProfileStyle";
import { useLocation, useNavigate } from "react-router-dom";
import basicProfileImage from "../../../assets/images/basicProfileImg.png";
import uploadIcon from "../../../assets/images/uploadFile.png";
import Button from "../../../components/Button/Button";
import Header from "../../../components/Header/Header";
import UserInput from "../../../components/UserInput/UserInput";
import fetchApi from "../../../utils/fetchApi";
import UserInfo from "../../../contexts/LoginContext";
import useDebounce from "../../../hooks/useDebounce";
import SquareButton from "../../../components/Button/SquareButton/SquareButton";
import styled from "styled-components";
import { useImage } from "../../../hooks/useImage";

const UserSelectDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export default function ProfileSettings({ email, password }) {
  const navigate = useNavigate();
  const location = useLocation();
  const uploadInput = useRef(null);

  const { image, setImage, inputImageHandler } = useImage(basicProfileImage);
  // [imageUrl, setImageUrl] = useState(""); // 이미지 URL 상태 추가

  const [name, setName] = useState(""),
    [nameValid, setNameValid] = useState(true),
    [nameError, setNameError] = useState("");

  const [accountname, setAccountname] = useState(""),
    [accountnameValid, setAccountnameValid] = useState(true),
    [accountnameError, setAccountnameError] = useState("");

  const [prevAccount, setPrevAccount] = useState("");

  const isModify = location.pathname.includes("modify");
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const { output: accountValidResult, setKeyword: setAccountKeyword } = useDebounce(
    "user/accountnamevalid",
    JSON.stringify({
      user: {
        accountname: accountname,
      },
    })
  );
  const [introduce, setIntroduce] = useState("");
  const splitString = "{[split]}";

  const [userFassion, setUserFassion] = useState(new Set());

  const modifyUserProfile = () => {
    const data = {
      user: {
        username: name,
        accountname: accountname,
        intro: (introduce || userFassion.size) && `${introduce}${splitString}${[...userFassion].join(",")}`,
        image: image,
      },
    };
    fetchApi("user", "PUT", JSON.stringify(data)).then((res) => {
      const accountname = res.user.accountname,
        image = res.user.image,
        username = res.user.username,
        intro = res.user.intro;

      setUserInfo((prev) => {
        return { ...prev, accountname, image, username, intro };
      });
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate(`/profile/${res.user.accountname}`);
    });
  };

  useEffect(() => {
    if (isModify) {
      try {
        fetchApi("user/myinfo", "GET").then((res) => {
          const introduce = res.user.intro.split(splitString)[0];
          const strUserFassion = res.user.intro.split(splitString)[1];

          setAccountname(res.user.accountname);
          setName(res.user.username);
          setIntroduce(introduce);
          setUserFassion((prev) => (strUserFassion ? new Set(strUserFassion.split(",")) : prev));
          setImage(res.user.image);
          setPrevAccount(res.user.accountname);
        });
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
      }
    }
  }, [isModify, setImage]);

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

  useEffect(() => {
    setAccountKeyword(accountname);
    setAccountnameError("");

    if (prevAccount === accountname) {
      setAccountnameError("");
      setAccountnameValid(true);
      return;
    }
    const pattern = /^[A-Za-z0-9._]+$/;
    if (accountname && pattern.test(accountname)) {
      switch (accountValidResult.message) {
        case "사용 가능한 계정ID 입니다.":
          setAccountnameValid(true);
          setAccountnameError("");
          break;
        default:
          setAccountnameValid(false);
          setAccountnameError(accountValidResult.message);
          break;
      }
    } else if (accountname && !pattern.test(accountname)) {
      setAccountnameValid(false);
      setAccountnameError("영문, 숫자, 특수문자(.),(_)만 사용 가능합니다");
    } else {
      setAccountnameValid(false);
      setAccountnameError("");
    }
  }, [accountname, setAccountKeyword, accountValidResult, prevAccount]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (nameValid && accountnameValid) {
      const userData = {
        user: {
          email: email,
          password: password,
          image: image,
          username: name,
          accountname: accountname,
          intro: userFassion,
        },
      };

      try {
        await fetchApi("user", "POST", JSON.stringify(userData)); // fetch 호출을 fetchApi로 대체합니다.
      } catch (error) {
        console.error("가입 중 오류 발생:", error);
      } // 이미지 업로드 및 회원가입 API 요청
      navigate("/login");
    }
  };

  const fassionData = {
    street: "스트릿",
    casual: "캐주얼",
    dandy: "댄디",
    classic: "클래식",
    Y2K: "Y2K",
    office: "오피스",
    minimal: "미니멀",
    americanCasual: "아메카지",
    teckwear: "테크웨어",
    gophcore: "고프코어",
    blockcore: "블록코어",
    feminine: "페미닌",
    vintage: "빈티지",
    bohemian: "보헤미안",
  };

  const buttons = useRef(null);
  const fassionKeywordHandler = (e) => {
    setUserFassion((prev) => {
      if (prev.size >= 3) {
        e.target.checked = false;
      }
      if (e.target.checked) {
        return new Set([e.target.value, ...prev]);
      } else {
        const copy = new Set(prev);
        copy.delete(e.target.value);
        return copy;
      }
    });
  };

  console.log(userFassion);

  const imgUploadBtnHandler = () => {
    uploadInput.current.click();
  };

  return (
    <>
      {isModify && (
        <Header type="submitHeader">
          <Button category="basic" width="9rem" height="3.2rem" onClick={() => modifyUserProfile()} disabled={nameValid && accountnameValid ? false : true} form="profileForm">
            저장
          </Button>
        </Header>
      )}
      <ProfileSettingForm onSubmit={handleForm}>
        <ProfileTitle className={isModify && "a11y-hidden"}>{isModify ? "프로필 수정" : "프로필 설정"}</ProfileTitle>
        {!isModify && <ProfileInfo>나중에 언제든지 변경할 수 있습니다.</ProfileInfo>}
        <Label>
          <ImgUploadBtn type="button" onClick={imgUploadBtnHandler}>
            <Img src={image} alt="uploadFile" />
            <ImgIcon src={uploadIcon} alt="업로드아이콘" />
          </ImgUploadBtn>
        </Label>
        <UploadInput ref={uploadInput} id="profile" type="file" accept=".png, .jpg, .jpeg" onChange={inputImageHandler} hidden />

        <EditForm id="profileForm">
          <UserInput id="user-name" type="text" minLength={2} maxLength={10} placeholder={"2~10자 이내여야 합니다."} value={name} alertMsg={setNameError} onChange={handleNameInput} onBlur={handleNameInput} required>
            사용자이름
          </UserInput>
          {nameError && (
            <p
              style={{
                marginBottom: "2rem",
                marginTop: "-1rem",
                fontSize: "1.2rem",
                color: "var(--font-red-color)",
              }}
            >
              {nameError}
            </p>
          )}

          <UserInput
            id="user-id"
            type="text"
            placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
            value={accountname}
            valid={accountnameValid}
            alertMsg={setAccountnameError}
            onChange={(e) => {
              setAccountname(e.target.value);
            }}
            required
          >
            계정 ID
          </UserInput>
          {accountnameError && (
            <p
              style={{
                marginBottom: "2rem",
                marginTop: "-1rem",
                fontSize: "1.2rem",
                color: "var(--font-red-color)",
              }}
            >
              {accountnameError}
            </p>
          )}
          <UserInput id="user-introduce" type="text" placeholder="나를 소개하는 글을 작성해주세요." value={introduce} onChange={(e) => setIntroduce(e.target.value)} required>
            소개
          </UserInput>
          <p style={{ fontSize: "12px", color: "var(--gray-color)", marginBottom: "10px" }}>
            나를 소개하는 키워드<small> / 최대 3개</small>
          </p>
          <UserSelectDiv ref={buttons}>
            {Object.entries(fassionData).map((item) => {
              const value = item[1];
              return (
                <React.Fragment key={item}>
                  <SquareButton type="checkbox" data={value} value={value} state={userFassion} setState={(e) => fassionKeywordHandler(e)} />
                </React.Fragment>
              );
            })}
          </UserSelectDiv>
          {!isModify && (
            <Button category="basic" type="submit" onClick={handleForm} disabled={!(nameValid && accountnameValid)}>
              입9팔9 즐기러 가기
            </Button>
          )}
        </EditForm>
      </ProfileSettingForm>
    </>
  );
}
