import styled from "styled-components";

const StyledTopBasicNav = styled.nav`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding: 13px 16px;
  position: relative;
  border-bottom: 0.5px solid #dbdbdb;
  align-items: center;

  div {
    width: 22px;
    height: 22px;
  }

  img {
    width: 22px;
    height: 22px;
    cursor: pointer;
  }

  span {
    font-size: var(--font-lg-size);
    margin: 0;
  }

  input {
    display: block;
    width: 316px;
    height: 32px;
    margin: 8px 0px;
    padding: 0px 16px;
    background-color: #f2f2f2;
    border: none;
    border-radius: 32px;

    font-size: var(--font-md-size);
  }

  button {
    color: white;
    position: absolute;
    right: 16px;
    bottom: 8px;
    height: 32px;
  }
`;

export default StyledTopBasicNav;
