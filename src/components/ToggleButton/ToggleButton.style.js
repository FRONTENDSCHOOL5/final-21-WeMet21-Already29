import styled, { css } from "styled-components";

export const Input = styled.input`
  :checked + label {
    background-color: var(--main-color);
    color: var(--white-color);
  }
`;

export const Label = styled.label`
  font-size: 1.4rem;
  user-select: none;
  cursor: pointer;
  background-color: var(--unactive-color);
  border-radius: 30px;
  padding: 10px 15px;
  font-weight: 500;
`;

export const RadioInput = styled(Input)`
  :checked + label {
    background-color: ${(props) => (props.name === "size" ? "var(--unactive-color)" : "initial")};
  }

  :checked + label .image-wrapper {
    transition: 0.2s ease;
    background-color: var(--unactive-color);
  }
`;

export const RadioLabel = styled(Label)`
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  ${({ name: productCategory }) =>
    productCategory === "size"
      ? css`
          background-color: var(--box-gray-color);
          width: 40px;
          height: 30px;
          border-radius: 5px;
        `
      : css`
          background-color: initial;
          flex-direction: column;
          gap: 5px;
        `};

  img {
    object-fit: contain;
  }

  .image-wrapper {
    width: 30px;
    height: 30px;
    padding: 12px;
    border-radius: 50%;
  }

  :hover .image-wrapper {
    outline: 1px solid var(--unactive-color);
  }

  .category-text {
    font-size: 1rem;
    color: var(--gray-color);
    font-weight: 350;
  }
`;

export const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const RadioDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  gap: ${({ name }) => (name === "size" ? "12px" : "14px")};
  justify-content: ${({ name }) => name === "size" && "space-between"};
`;
