import styled from "styled-components";

const Upload = styled.section`
  border: 5px solid red;
  display: flex;
  align-items: start;
  gap: 1.2rem;
  position: relative;
`;

const CommentInput = styled.div`
  border-top: 1px solid var(--line-gray-color);
  padding: 1.2rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items:center;

  .instaPost_input {
    width: 26rem;
    margin: 0 1.8rem;
    border:0px;
    font-size:1.4rem;
    font-weight:400;

  
    
    ::placeholder{
      color: #c4c4c4;
      font-size: 1.4rem;
      font-weight: 400;
    }

      &:focus {
      outline: 0;
      nofocus:focus {
        outline: none;
      }
    }    
  }

  .uploadBtn{
    border: 0px;
    background-color:transparent;
    width: 5rem;
    font-size:1.4rem;
    color: #c4c4c4;
    font-weight:500;
  }

  .uploadBtn.active{
    color: var(--main-color);
    font-weight: 700;
  }

`;

const Div = styled.div`
  width:100%;  
`;

const Form = styled.form`
  width:100%;
`;

const CommnetDiv = styled.div`
  border:1px solid red;
  padding: 2rem 1.6rem;
  overflow-y: auto;
  height:23.6rem;

  &::-webkit-scrollbar {
    width:0.9rem;
  };

  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4; /* 스크롤 막대 색상 */
    border-radius: 3px;
  };

  &::-webkit-scrollbar-track {
    background-color: transparent;
  };
`;

const SmallDiv = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: start;
  align-items: start;
  gap:1.2rem;
  margin-bottom:1.6rem;

  .time{
    font-size: 1rem;
    color: var(--gray-color);
  }
  .time::before{
    content:"·";
    margin-right:0.5rem;
  }
`;

const Namediv = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
  gap: 1.2rem;
  /* border:1px solid green; */
`;

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

const Img = styled.img`
  width: 3.6rem;
  height: 3.6rem;  
`;

const Label = styled.label`
  cursor: pointer;
  position: absolute;
  right: 1.6rem;
  bottom: 1.6rem;
`;

export { Upload, CommentInput, Div, Form, UploadInput, Img, Label, Textarea, CommnetDiv, SmallDiv, Namediv };
