import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";

import error404 from "../../assets/images/404.png";

import { Page } from "./Error.style";

export default function Error({ children, img }) {
  const navigator = useNavigate();
  return (
    <Page>
      <img src={img ? img : error404} alt="에러" />
      {children || "페이지를 찾을 수 없습니다 :("}
      <Button category="basic" width="80%" onClick={() => navigator(-1)}>
        이전 페이지
      </Button>
    </Page>
  );
}
