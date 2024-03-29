import styled from "styled-components";

export const CommentSection = styled.section`
  position: relative;
  padding-bottom: 60px;
`;

export const Form = styled.form`
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  width: 390px;
  gap: 10px;
  align-items: center;
  padding: 10px 16px;
  border-top: 1px solid var(--line-gray-color);
  box-sizing: border-box;
  background: #fff;

  input {
    flex-grow: 1;
    border: 0;

    &:focus {
      outline: 0;
    }
  }

  .uploadBtn {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--unactive-color);
  }

  .uploadBtn.active {
    color: var(--main-color);
  }
`;

export const Text = styled.p`
  line-height: 2rem;
  font-size: 1.4rem;
  color: #333333;
  margin-left: 4.8rem;
  line-break: anywhere;
`;

export const CommnetDiv = styled.div`
  padding: 2rem 1.6rem;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 0.9rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e2e2e2; /* 스크롤 막대 색상 */
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const CommentArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-bottom: 1.6rem;
  position: relative;
  gap: 1rem;

  .time {
    font-size: 1rem;
    color: var(--gray-color);
  }
  .time::before {
    content: "·";
    margin-right: 0.5rem;
  }
`;

export const Namediv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
`;

export const VerticalBtn = styled.button`
  cursor: pointer;
`;

export const Label = styled.label`
  cursor: pointer;
  position: absolute;
  right: 1.6rem;
  bottom: 1.6rem;
`;

export const Img = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  object-fit: cover;
`;
