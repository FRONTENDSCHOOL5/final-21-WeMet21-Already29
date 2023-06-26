import styled from "styled-components";

const Page = styled.main`
  margin: 10px 34px 0;
`;

const ImgPlace = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3/2;
  margin: 18px 0 30px;
  background-color: #f2f2f2;
  border: 0.5px solid var(--line-gray-color);
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const InputLabel = styled.label`
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding-bottom: 8px;
  margin: 10px 0;
  border: 0;
  box-shadow: 0 1px 0 0 var(--line-gray-color);
  outline: none;

  &::placeholder {
    color: #bdbdbd;
    font-size: 1.4rem;
  }

  &:focus {
    box-shadow: 0 2px 0 0 var(--main-color);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Button = styled.button`
  background-color: var(--main-color);
  border: 0;
  color: #fff;
  font-size: 1.4rem;
  padding: 7px 32px;
  border-radius: 32px;
  cursor: pointer;

  &:disabled {
    background-color: var(--unactive-color);
  }
`;

const ImgUploadButton = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  bottom: 12px;
  right: 12px;
  padding: 7px;
  border-radius: 50%;
  background-color: var(--gray-color);
  cursor: pointer;
`;

export { Page, ImgPlace, InputLabel, Input, Button, ImgUploadButton };
