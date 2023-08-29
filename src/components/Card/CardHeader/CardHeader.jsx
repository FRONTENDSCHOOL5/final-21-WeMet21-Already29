import React from "react";
import { Link } from "react-router-dom";

import { profileImgErrorHandler } from "../../../utils/imageErrorHandler";

import { PostHeader } from "./CardHeader.style";

export default function CardHeader({ image, username, accountname, time, children }) {
  return (
    <PostHeader>
      <Link to={`/profile/${accountname}`}>
        <img src={image} className="profile-image" alt="프로필 사진" onError={profileImgErrorHandler} width={36} height={36} />
        <div>
          <p className="user-name">
            <span className="a11y-hidden">이름</span>
            {username}
            {time && <time>{time}</time>}
          </p>
          {accountname && <p>@ {accountname}</p>}
        </div>
      </Link>
      {children}
    </PostHeader>
  );
}
