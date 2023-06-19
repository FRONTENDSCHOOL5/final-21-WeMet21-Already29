import React, { useState } from "react";
import profileImg from "../../assets/images/profileImg.png";
import { Upload, Form, UploadInput, Label, Img } from "./PostDetailStyle";

export default function PostDetail() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() !== "") {
      const postId = "8989@test.com"; // 댓글을 달 게시물의 ID

      const url = `https://api.mandarin.weniv.co.kr/product/post/${postId}/comments`;
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
        .then((response) => {
          if (response.ok) {
            console.log("댓글 전송 완료!");
            setComment("");
            addComment(comment);
          } else {
            throw new Error("댓글 전송 실패");
          }
        })
        .catch((error) => {
          console.error("댓글 전송 실패:", error);
        });
    }
  };

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
              {comments.map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}
            </div>
          </Form>
        </div>
      </Upload>
    </>
  );
}
