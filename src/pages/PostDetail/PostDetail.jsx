import React, { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/images/profileImg.png";
import IconMoreVertical from "../../assets/images/IconMoreVertical.png";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";
import { Upload, Form, Text, CommnetDiv, SmallDiv, Namediv, VerticalBtn, CommentInput, Label, Img } from "./PostDetailStyle";
import Header from "../../components/Header/Header";
import BottomSheetContext from "../../contexts/ModalContext/BottomSheetContext";
import BottomSheet from "../../components/Modal/BottomSheet/BottomSheet";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import { useParams } from "react-router";
import { PostMenuWrap, PostContent, PostHeader } from "../../components/Post/PostStyle";
import commentImg from "../../assets/images/icon-message-circle.png";
import heart from "../../assets/images/uil_heart.png";
import fillHeart from "../../assets/images/uil_fullHeart.png";
import { heartButtonHandler } from "../../utils/heartButtonHandler";
import { Link, useNavigate } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

export default function PostDetail() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  // 나의 username
  const username = localStorage.getItem("username");

  const pageEnd = useRef(null);
  const { getData, page } = useInfiniteScroll(`post/${params.id}/comments`, pageEnd);

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getData(page)
        .then((res) => res.json())
        .then((json) => {
          console.log(comments);
          setComments((prev) => {
            return prev.length === 0 ? json.comments : [...prev, ...json.comments];
          });
        });
    }, 300);
  }, [page]);

  const addComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    fetchPost();
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
    fetchPost();
  };

  const handleOpenModal = (commentId) => {
    setTargetCommentId(commentId);
    setIsModalOpen(true); // 모달 오픈
  };

  // 댓글 작성
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() !== "") {
      const url = `https://api.mandarin.weniv.co.kr/post/${params.id}/comments`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  // 댓글 삭제
  const deleteComment = () => {
    fetch(`https://api.mandarin.weniv.co.kr/post/${params.id}/comments/${targetCommentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        fetchPost();
        if (result.status === "200") {
          setIsModalOpen(false);
        } else {
          throw new Error("댓글 삭제 실패");
        }
      })
      .catch((error) => {
        console.error("댓글 삭제 실패:", error);
      });

    const filterComment = comments.filter((v) => {
      console.log(v.id);
      return v.id !== targetCommentId;
    });

    setComments(filterComment);
  };

  const fetchPost = () => {
    fetch(`https://api.mandarin.weniv.co.kr/post/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setPost(json.post));
  };
  console.log(post);

  const heartHandler = async (postId, postHeart) => {
    if (postHeart) {
      const res = await heartButtonHandler.minus(postId);
      const json = await res.json();
      console.log(json);
    } else {
      const res = await heartButtonHandler.plus(postId);
      const json = await res.json();
      console.log(json);
    }
    fetchPost();
  };

  const deletePostHandler = () => {
    fetch(`https://api.mandarin.weniv.co.kr/post/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <>
      <BottomSheetContext.Consumer>
        {({ isBottomSheetOpen, setBottomSheetOpen }) => (
          <>
            {post && username === post.author.username ? <Header type="basic" setBottomSheetOpen={setBottomSheetOpen} /> : <Header type="back" />}
            <ModalContext.Consumer>
              {({ setModalOpen }) =>
                isBottomSheetOpen && (
                  <BottomSheet>
                    <button
                      type="button"
                      onClick={() => {
                        setBottomSheetOpen(false);
                        setModalOpen(true);
                      }}
                    >
                      게시물 삭제
                    </button>
                    <Link to={`../modify/${post.id}`}>수정</Link>
                  </BottomSheet>
                )
              }
            </ModalContext.Consumer>
            <ModalContext.Consumer>
              {({ isModalOpen, setModalOpen }) =>
                isModalOpen && (
                  <AlertModal
                    submitText="삭제"
                    onSubmit={() => {
                      deletePostHandler();
                      navigate(`/profile/${post.author.accountname}`);
                      setModalOpen(false);
                    }}
                    onCancel={() => setModalOpen(false)}
                  >
                    게시글을 삭제할까요?
                  </AlertModal>
                )
              }
            </ModalContext.Consumer>
          </>
        )}
      </BottomSheetContext.Consumer>
      <main>
        {post && (
          <>
            <PostHeader style={{ cursor: "pointer" }} onClick={() => navigate(`/profile/${post.author.accountname}`)}>
              <img src={post.author.image} alt="게시글 작성자 프로필 사진" />
              <div>
                <h2>
                  <span className="a11y-hidden">게시글 작성자 이름</span>
                  {post.author.username}
                </h2>
                <p>@ {post.author.accountname}</p>
              </div>
            </PostHeader>
            <PostContent>
              <p className="post-text">{post.content}</p>
              {post.image ? <img src={post.image} className="post-image" alt="게시글 이미지" /> : ""}
              <PostMenuWrap>
                <button
                  type="button"
                  onClick={() => {
                    heartHandler(post.id, post.hearted);
                  }}
                >
                  <img src={post.hearted ? fillHeart : heart} className="heart-image" alt="좋아요 이미지" />
                </button>
                <p>
                  <span className="a11y-hidden">좋아요 : </span>
                  {post.heartCount}
                </p>

                <img src={commentImg} className="comment-image" alt="댓글 이미지" />

                <p>
                  <span className="a11y-hidden">댓글 : </span>
                  {post.commentCount}
                </p>
              </PostMenuWrap>
              <time dateTime={post.createdAt.slice(0, 10)}>{post.createdAt.slice(0, 10).replace("-", "년 ").replace("-", "월 ") + "일"}</time>
            </PostContent>
          </>
        )}
      </main>
      <Upload>
        <div>
          <Form onSubmit={handleCommentSubmit}>
            <CommnetDiv>
              {comments.length > 0 &&
                comments.map((comment, index) => (
                  <SmallDiv key={index}>
                    <Namediv>
                      <Img src={comment.author.image} alt="profileImg" style={{ cursor: "pointer" }} onClick={() => navigate(`/profile/${comment.author.accountname}`)} />
                      <p style={{ fontSize: "1.4rem", fontWeight: "500", cursor: "pointer" }} onClick={() => navigate(`/profile/${comment.author.accountname}`)}>
                        {comment.author.username}
                      </p>
                      <p className="time">{calculateElapsedTime(comment.createdAt)}</p>
                    </Namediv>
                    {comment.author.username === username && (
                      <VerticalBtn type="button" className="more" onClick={() => handleOpenModal(comment.id)}>
                        <img src={IconMoreVertical} alt="" />
                      </VerticalBtn>
                    )}
                    <Text>{comment.content}</Text>
                  </SmallDiv>
                ))}
              <div ref={pageEnd} />
            </CommnetDiv>

            <CommentInput>
              <Label htmlFor="file-sync" className="file-sync"></Label>
              <input type="file" id="file-sync" accept=".png, .jpg, .jpeg" multiple hidden />
              <Img src={profileImg} alt="profileImg" />
              <input className="instaPost_input" type="text" placeholder="댓글 입력하기..." value={comment} onChange={handleCommentChange} />
              <button style={{ cursor: "pointer" }} className={comment ? "uploadBtn active" : "uploadBtn"} type="submit">
                게시
              </button>
            </CommentInput>
            {isModalOpen && <AlertModal onSubmit={deleteComment} onCancel={() => setIsModalOpen(false)} submitText="삭제" children="댓글을 삭제할까요?" />}
          </Form>
        </div>
      </Upload>
    </>
  );
}
