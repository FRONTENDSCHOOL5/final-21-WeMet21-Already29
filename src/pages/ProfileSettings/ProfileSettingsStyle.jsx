import styled from "styled-components";

export const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileTile = styled.section`
  margin-top: 4rem;
  font-size: var(--font-lg-size);
`;

export const ProfileInfo = styled.section`
  margin-top: 1.2rem;
  color: var(--gray-color);
  font-size: var(--font-md-size);
`;

export const EditWrap = styled.section`
  margin: 3rem 0;
  cursor: pointer;
`;

export const UploadButton = styled.section``;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 1.2rem;
  color: var(--gray-color);
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  margin-bottom: 3rem;
  padding-bottom: 0.8rem;
  border: none;
  outline: none;
  font-size: 1.4rem;
  border-bottom: 2px solid var(--line-gray-color);

  &:focus {
    border-color: var(--main-color);
  }

  &::placeholder {
    font-size: 1.4rem;
    color: var(--line-gray-color);
  }
`;
