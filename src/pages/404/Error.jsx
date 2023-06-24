import React from "react";
import error404 from "../../assets/images/404.png";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Page } from "./ErrorStyle";

// children으로 전달해주시면 에러 메시지가 바뀝니다.
// props로 img 전달해주시면 이미지가 바뀝니다.
export default function Error({ children, img }) {
  const navigator = useNavigate();
  return (
    <Page>
      <img src={img ? img : error404} alt="" />
      {children ? children : "페이지를 찾을 수 없습니다 :("}
      <Button onClick={() => navigator(-1)}>이전 페이지</Button>
    </Page>
  );
}
