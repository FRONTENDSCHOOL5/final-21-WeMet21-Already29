import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

export const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 30px 0 26px;
  margin-bottom: 6px;
  border: 1px solid var(--line-gray-color);
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;

  p {
    color: var(--gray-color);
    line-height: 1.5;
  }

  img {
    width: 110px;
    height: 110px;
    margin: 0 4rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const FollowCountSpan = styled.span`
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--font-black-color);
`;

export const ProfileIntro = styled.div`
  .user-name {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .account-name {
    font-size: 1.2rem;
    color: var(--gray-color);
    margin: 10px 0 20px;
  }

  .intro {
    color: var(--gray-color);
    font-size: 1.4rem;
  }
`;

export const ShareButton = styled.button`
  border-radius: 50%;
  border: 1px solid var(--line-gray-color);
  width: 34px;
  height: 34px;
  padding: 0;
  vertical-align: top;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const LinkStyle = styled(NavLink)`
  font-weight: bold;
  font-size: 1.6rem;

  &::after {
    content: ">";
    margin-left: 5px;
  }
`;

export const ProductSection = styled.section`
  overflow: hidden;
  border: 1px solid var(--line-gray-color);
  padding: 16px 0 23px 30px;
  margin-bottom: 6px;
`;

export const PostSection = styled.section`
  border: 1px solid var(--line-gray-color);
  padding: 16px;
  padding-top: 0;
  li {
    list-style: none;
  }
  li + li {
    margin-top: 32px;
  }
`;

export const PostSectionHeader = styled.header`
  position: sticky;
  width: 100%;
  border-bottom: 1px solid var(--line-gray-color);
  margin: 10px 0;
  button {
    margin-left: auto;
    width: 26px;
    height: 26px;
    border: 0;
    padding: 0;
    background-color: initial;
  }
`;

export const Posts = styled.div`
  ${(props) =>
    props.isAlbum &&
    css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      img {
        object-fit: cover;
        height: 110px;
      }
      li + li {
        margin: 0;
      }
    `};
`;