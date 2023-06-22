import styled from "styled-components";

const Upload = styled.section`
  border: 1px solid red;
  padding: 2rem 1.6rem;
  display: flex;

  align-items: start;
  gap: 1.2rem;
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
  margin-top: 1.2rem;
  overflow: hidden;

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

const Div = styled.div`
  width: 30.4rem;
  height: 30rem;
  object-fit: cover;  
  object-position:absolute;  
`;

const ImgDiv = styled.div`
  width: 30.3rem;
  height: 30.4rem;
  border-radius: 1rem;
  overflow:hidden;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Label = styled.label`
  cursor: pointer;
  position: absolute;
  right: 1.6rem;
  bottom: 1.6rem;
`;

const UploadInput = styled.input``;

const Img = styled.img``;

export { Upload, Form, UploadInput, Img, Label, Textarea, Div, ImgDiv };
