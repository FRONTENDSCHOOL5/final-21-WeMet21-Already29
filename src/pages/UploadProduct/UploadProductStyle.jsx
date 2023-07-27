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

export { Page, ImgPlace, InputLabel, ImgUploadButton };
