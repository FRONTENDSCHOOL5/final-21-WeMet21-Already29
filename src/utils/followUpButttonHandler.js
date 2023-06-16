export const followButtonHandler = (accountname) => {
  fetch(`https://api.mandarin.weniv.co.kr/profile/${accountname}/follow`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    },
  });
};

export const unfollowButtonHandler = (accountname) => {
  fetch(`https://api.mandarin.weniv.co.kr/profile/${accountname}/follow`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    },
  });
};
