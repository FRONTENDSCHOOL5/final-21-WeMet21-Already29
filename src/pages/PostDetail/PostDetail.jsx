import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
import profileImg from "../../assets/images/profileImg.png";
import { Upload, Form, UploadInput, Label, Img } from "./PostDetailStyle";

export default function PostDetail() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  // const [post, setPost] = useState([]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGQ2ZWYzYjJjYjIwNTY2MzM4MGNkNCIsImV4cCI6MTY5MjM2NDA5MywiaWF0IjoxNjg3MTgwMDkzfQ.vuyXTUmBLvvHsyizMnm1Wh7tT9vbbothySPTUZqZ5ho";

  // 임시로 /post/feed로 가져온 게시글 중 하나의 id로 설정
  const postId = "648c2a98b2cb20566336745f";

  const addComment = (newComment) => {
    console.log(newComment);

    setComments((prevComments) => [...prevComments, newComment]);
  };

  const calculateElapsedTime = (timestamp) => {
    const currentTime = new Date().getTime();
    const elapsedMilliseconds = currentTime - timestamp;
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    return elapsedMinutes > 0 ? `${elapsedMinutes}분 전` : `방금 전`;
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // 댓글 리스트
  const getCommentList = () => {
    fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/comments/?limit=100`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        // setComments()
      })
      .catch((error) => {
        console.error("댓글 불러오기 실패:", error);
      });
  };

  // 댓글 작성
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() !== "") {
      console.log(postId);

      const url = `https://api.mandarin.weniv.co.kr/post/${postId}/comments`;
      const headers = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGQ2ZWYzYjJjYjIwNTY2MzM4MGNkNCIsImV4cCI6MTY5MjM2NDA5MywiaWF0IjoxNjg3MTgwMDkzfQ.vuyXTUmBLvvHsyizMnm1Wh7tT9vbbothySPTUZqZ5ho",
        "Content-Type": "application/json",
      };

      const data = {
        comment: {
          content: comment,
        },
      };

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 404) throw new Error("댓글 전송 실패");
          else {
            setComment("");
            // addComment(comment); 이전 코드
            addComment(result.comment);
          }
        })
        .catch((error) => {
          console.error("댓글 전송 실패:", error);
        });
    }
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <>
      <Upload>
        <h2 className="a11y-hidden">게시글 작성</h2>

        <div>
          <Form onSubmit={handleCommentSubmit}>
            <Label htmlFor="file-sync" className="file-sync"></Label>
            <UploadInput type="file" id="file-sync" accept=".png, .jpg, .jpeg" multiple hidden />
            <Img src={profileImg} alt="profileImg" />
            <input className="instaPost_input" type="text" placeholder="댓글 달기..." value={comment} onChange={handleCommentChange} />
            <button type="submit">게시</button>
            <div>
              {comments.length > 0 &&
                comments.map((comment, index) => (
                  <div key={index}>
                    <Img src={comment.author.image} alt="profileImg" />
                    <p>{comment.author.username}</p>
                    <p>{comment.content}</p>
                    <p>{calculateElapsedTime(comment.createdAt)}</p>
                  </div>
                ))}
            </div>
          </Form>
        </div>
      </Upload>
    </>
  );
}
