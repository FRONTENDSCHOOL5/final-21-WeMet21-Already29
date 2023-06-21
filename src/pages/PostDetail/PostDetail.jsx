import React, { useEffect, useState } from "react";
import profileImg from "../../assets/images/profileImg.png";
import IconMoreVertical from "../../assets/images/IconMoreVertical.png";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";
import {  Upload, Form, Text, CommnetDiv, SmallDiv, Namediv, VerticalBtn, CommentInput, Label, Img } from "./PostDetailStyle";

export default function PostDetail() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState("");

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGQ2ZWYzYjJjYjIwNTY2MzM4MGNkNCIsImV4cCI6MTY5MjM2NDA5MywiaWF0IjoxNjg3MTgwMDkzfQ.vuyXTUmBLvvHsyizMnm1Wh7tT9vbbothySPTUZqZ5ho";

  // 임시로 /post/feed로 가져온 게시글 중 하나의 id로 설정
  const postId = "648c2a98b2cb20566336745f";

  // 나의 username
  const username = "8989";

  const addComment = (newComment) => {
    console.log(newComment);

    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const calculateElapsedTime = (timestamp) => {
    const createdTime = new Date(timestamp).getTime();
    const currentTime = new Date().getTime();
    const elapsedMilliseconds = currentTime - createdTime; // 여기서 결과가 NaN
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);

    if (elapsedDays > 0) {
      return `${elapsedDays}일 전`;
    } else if (elapsedHours > 0) {
      return `${elapsedHours}시간 전`;
    } else if (elapsedMinutes > 0) {
      return `${elapsedMinutes}분 전`;
    } else {
      return "방금 전";
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleOpenModal = (commentId) => {
    setTargetCommentId(commentId);
    setIsModalOpen(true); // 모달 오픈
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

        setComments(result.comments);
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
        Authorization: `Bearer ${token}`,
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

  // 댓글 삭제
  const deleteComment = () => {
    fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/comments/${targetCommentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.status === "200") {
          setIsModalOpen(false);
          getCommentList();
        } else {
          throw new Error("댓글 삭제 실패");
        }
      })
      .catch((error) => {
        console.error("댓글 삭제 실패:", error);
      });
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
            <CommnetDiv>
              {comments.length > 0 &&
                comments.map((comment, index) => (
              <SmallDiv key={index}>
                <Namediv>
                  <Img src={comment.author.image} alt="profileImg" />
                  <p style={{fontSize:"1.4rem", fontWeight:"500"}}>{comment.author.username}</p>
                  <p className='time'>{calculateElapsedTime(comment.createdAt)}</p>
                </Namediv>
                <VerticalBtn type="button" className="more" onClick={() => handleOpenModal(comment.id)}>
                  <img src={IconMoreVertical} alt="" />
                </VerticalBtn>
                <Text>{comment.content}</Text>
                {comment.author.username === username && (
                      <div>
                      </div>
                    )}  
              </SmallDiv>
                ))}
            </CommnetDiv>
            <CommentInput>  
              <Label htmlFor="file-sync" className="file-sync"></Label>
              <input type="file" id="file-sync" accept=".png, .jpg, .jpeg" multiple hidden />
              <Img src={profileImg} alt="profileImg" />
              <input className="instaPost_input" type="text" placeholder="댓글 입력하기..." value={comment} onChange={handleCommentChange} />
              <button style={{ cursor: "pointer" }} className={comment ? "uploadBtn active" : "uploadBtn"} type="submit">게시</button>
            </CommentInput>
            {isModalOpen && <AlertModal onSubmit={deleteComment} onCancel={() => setIsModalOpen(false)} submitText="삭제" children="댓글을 삭제할까요?" />}
          </Form>
        </div>
      </Upload>
    </>
  );
}
