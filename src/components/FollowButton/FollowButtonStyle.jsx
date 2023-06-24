import styled from "styled-components";

export const ButtonStyle = styled.button`
  display: block;
  border-radius: 20px;
  width: ${props =>
    props.width === "s"
      ? "56px"
      : props.width === "ms"
      ? "90px"
      : props.width === "m"
      ? "120px"
      : "322px"};
  padding: ${props =>
    props.size === "s"
      ? "7px 0px"
      : props.size === "ms"
      ? "8px 0px"
      : props.size === "m"
      ? "9px 0px"
      : "13px 0px"};
  background-color: ${props =>
    props.bgColor === "active"
      ? "#286140"
      : props.bgColor === "inactive"
      ? "#629678"
      : "#fffff"};

  display: flex;
  text-align: center;
  justify-content: center;
  border: ${props => (props.border === "active" ? "1px solid #DBDBDB" : null)};
  color: ${props => (props.color === "active" ? "#767676" : "#ffffff")};
`;
