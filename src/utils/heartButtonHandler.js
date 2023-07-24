import fetchApi from "./fetchApi";

export const heartButtonHandler = {
  plus(postId) {
    // return fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/heart`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     "Content-type": "application/json",
    //   },
    // });
    fetchApi(`post/${postId}/heart`, "POST");
  },

  minus(postId) {
    // return fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/unheart`, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     "Content-type": "application/json",
    //   },
    // });
    fetchApi(`post/${postId}/unheart`, "DELETE");
  },
};

// 객체 메서드의 파라미터로 게시글 id 인입해주면 됩니다
// 반환 값은 promise 객체입니다.
