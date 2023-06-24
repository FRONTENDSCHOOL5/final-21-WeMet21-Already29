import styled from 'styled-components';

const StyledUserList = styled.article`
  .userList {
    display: flex;
    margin-bottom: 16px;
    cursor: pointer;
    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }
  }

  .userInfo {
    margin-left: 12px;
  }

  .userInfo .username {
    padding: 5px 0 6px;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
  }

  .userInfo .accountname {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }

  .keyword {
    color: var(--main-color);
  }
`;

export default StyledUserList;
