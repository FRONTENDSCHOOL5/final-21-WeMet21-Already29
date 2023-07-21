import styled from "styled-components";

const BtnStyle = styled.button`
  display: block;
  border-radius: 10px;
  width: ${(props) =>
    props.width === "s"
      ? "56px"
      : props.width === "ms"
      ? "90px"
      : props.width === "m"
      ? "120px"
      : props.width === "L"
      ? "322px"
      : "322px"};
  padding: ${(props) =>
    props.size === "s"
      ? "7px 0px"
      : props.size === "ms"
      ? "8px 0px"
      : props.size === "m"
      ? "9px 0px"
      : "13px 0px"};
  background-color: ${(props) =>
    props.bgColor === "active"
      ? "var(--main-color)"
      : props.bgColor === "inactive"
      ? "var(--unactive-color)"
      : "#fffff"};

  display: flex;
  text-align: center;
  justify-content: center;
  color: var(--white-color);
  font-size: 14px;
`;

export default BtnStyle;
