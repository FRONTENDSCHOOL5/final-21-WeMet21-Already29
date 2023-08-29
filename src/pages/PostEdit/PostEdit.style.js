import styled from "styled-components";

const Upload = styled.section`
  padding: 2rem 1.6rem;
  position: relative;
  height: calc(100vh - 8.8rem);
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 10px;
  div {
    position: fixed;
    bottom: 0;
    width: 390px;
    z-index: 1;
  }
`;

const Textarea = styled.textarea`
  border: 0px;
  resize: none;
  width: 100%;
  height: auto;
  max-height: 30rem;
  overflow: hidden;
  font-family: "Noto Sans", sans-serif;
  font-size: 1.4rem;
  font-weight: 500;

  &:focus {
    outline: 0;
    nofocus:focus {
      outline: none;
    }
  }

  ::placeholder {
    color: var(--gray-color);
    font-weight: 400;
    font-size: 1.4rem;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  flex-basis: 80%;
  img {
    object-fit: cover;
    border-radius: 20px;
    height: 100%;
    margin-bottom: 10px;
  }
  button {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
    padding: 5px;
  }
`;

const Label = styled.label`
  cursor: pointer;
  position: absolute;
  right: 1.6rem;
  bottom: 1.6rem;
  width: 50px;
  z-index: 100;
`;

const UploadInput = styled.input``;

const Img = styled.img``;

export { Upload, Form, UploadInput, Img, Label, Textarea, ImgWrapper };
