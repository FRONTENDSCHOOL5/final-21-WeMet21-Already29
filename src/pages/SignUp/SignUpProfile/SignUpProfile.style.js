import styled from "styled-components";

export const ProfileSettingForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileTitle = styled.h2`
  margin-top: 4rem;
  font-size: var(--font-lg-size);
`;

export const ProfileInfo = styled.section`
  margin-top: 1.2rem;
  color: var(--gray-color);
  font-size: var(--font-md-size);
`;

export const Img = styled.img`
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  width: 11rem;
  cursor: pointer;
  position: relative;
  object-fit: cover;
`;

export const UserSelectDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 48px;
`;

export const ImgUploadBtn = styled.button`
  width: 11rem;
  height: 11rem;
  margin: 3rem 0;
  position: relative;
`;

export const ImgIcon = styled.img`
  width: 5rem;
  position: absolute;
  bottom: 0%;
  right: 0%;
`;

export const UploadInput = styled.input``;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
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
