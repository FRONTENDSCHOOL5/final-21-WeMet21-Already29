import { useContext } from "react";
import fetchApi from "../utils/fetchApi";
import UserInfo from "../contexts/LoginContext";

export default function useGetUserInfo() {
  const { setUserInfo } = useContext(UserInfo);
  function fetchUserInfo() {
    fetchApi("user/myinfo", "GET").then((res) => {
      setUserInfo(res.user);
      localStorage.setItem("userInfo", JSON.stringify(res.user));
    });
  }

  return fetchUserInfo;
}
