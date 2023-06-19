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

const Form = styled.form``;

const Textarea = styled.textarea`
  border: 0px;
  resize: none;
  width: 100%;
  height: 100%;
  margin-top: 1.2rem;

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

const UploadInput = styled.input``;

const Img = styled.img``;

const Label = styled.label`
  cursor: pointer;
  position: absolute;
  right: 1.6rem;
  bottom: 1.6rem;
`;

export { Upload, Form, UploadInput, Img, Label, Textarea };
