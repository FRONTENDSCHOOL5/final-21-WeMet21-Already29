import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import StyledUserList from './UserListStyle';
import BasicProfile from '../../assets/images/Unnamed.png';

function UserList({
  searchList,
  keyword,
  userkey,
  image,
  username,
  accountname,
}) {
  const newaccountname = accountname.slice(2);

  const handleImage = useCallback((e) => {
    e.target.src = BasicProfile;
  }, []);

  return (
    <StyledUserList>
      <Link to={`/profile/${newaccountname}`}>
        <li className="userList" key={userkey}>
          <img src={image} alt="" onError={handleImage} />
          <div className="userInfo">
            {username.includes(keyword) ? (
              <p className="username">
                {username.split(keyword)[0]}
                <span className="keyword">{keyword}</span>
                {username.replace(username.split(keyword)[0] + keyword, '')}
              </p>
            ) : (
              <p className="username">{username}</p>
            )}
            {accountname.includes(keyword) ? (
              <p className="accountname">
                {accountname.split(keyword)[0]}
                <span className="keyword">{keyword}</span>
                {accountname.replace(
                  accountname.split(keyword)[0] + keyword,
                  ''
                )}
              </p>
            ) : (
              <p className="accountname">{accountname}</p>
            )}
          </div>
        </li>
      </Link>
    </StyledUserList>
  );
}

export default UserList;