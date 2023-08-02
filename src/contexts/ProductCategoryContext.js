import { createContext } from "react";

const category = createContext({
  outer: "아우터",
  onePiece: "원피스",
  top: "상의",
  pants: "하의",
  shoes: "신발",
  bag: "가방",
  fassionAcc: "패션소품",
  jewelry: "주얼리",
});

export default category;
