import { EmptyWrapper, EmptyImg, EmptyText } from "./EmptyHomeFeedStyle";
import grayLogo from "../../assets/images/search-big.png";
import GreenBigButton from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function EmptyHome() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/search");
  }
  
  return (
    <EmptyWrapper>
      <EmptyImg src={grayLogo} alt="로고이미지" />
      <EmptyText>유저를 검색해 팔로우 해보세요!</EmptyText>
      <GreenBigButton onClick={handleClick}>{"검색하기"}</GreenBigButton>
    </EmptyWrapper>
  );
}
