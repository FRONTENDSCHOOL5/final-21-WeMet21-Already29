import styled from "styled-components";

const Upload = styled.section`
  padding: 2rem 1.6rem;
  position: relative;
  height: calc(100vh - 8.8rem);
`;

const Form = styled.form`
  width: 100%;
`;

const Textarea = styled.textarea`
  border: 0px;
  resize: none;
  width: 100%;
  height: auto;
  max-height: 30rem;
  overflow: hidden;
  font-family: "Noto Sans", sans-serif;

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

const ImgDiv = styled.div`
  border-radius: 1rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Label = styled.label`
  cursor: pointer;
  position: absolute;
  right: 1.6rem;
  bottom: 1.6rem;
  width: 50px;
`;

const UploadInput = styled.input``;

const Img = styled.img``;

export { Upload, Form, UploadInput, Img, Label, Textarea, ImgDiv };
