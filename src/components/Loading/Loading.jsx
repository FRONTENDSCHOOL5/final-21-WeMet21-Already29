import React from "react";
import mascot from "../../assets/images/mascot.png";
import { LoadingImage } from "./LoadingStyle";

export default function Loading() {
  return <LoadingImage src={mascot} alt="로딩 중" />;
}
