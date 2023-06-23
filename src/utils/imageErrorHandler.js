import ErrorImg from "../assets/images/404.png";
import defaultProfile from "../assets/images/basicProfileImg.png";

export const imageErrorHandler = (e) => {
  e.target.onerror = null;
  e.target.src = ErrorImg;
  e.target.style.objectFit = "contain";
};

export const profileImgErrorHandler = (e) => {
  e.target.onerror = null;
  e.target.src = defaultProfile;
};
