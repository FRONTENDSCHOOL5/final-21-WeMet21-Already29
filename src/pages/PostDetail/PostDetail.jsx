import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useFetch from "../../hooks/useFetch";

import Header from "../../components/Header/Header";
import CardHeader from "../../components/Card/CardHeader/CardHeader";
import CardContent from "../../components/Card/CardContent/CardContent";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";
import BottomSheet from "../../components/Modal/BottomSheet/BottomSheet";
import Loading from "../../components/Loading/Loading";
import BottomSheetContext from "../../contexts/ModalContext/BottomSheetContext";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import UserInfo from "../../contexts/LoginContext";

import fetchApi from "../../utils/fetchApi";
import { heartButtonHandler } from "../../utils/heartButtonHandler";
import { profileImgErrorHandler } from "../../utils/imageErrorHandler";

import IconMoreVertical from "../../assets/images/IconMoreVertical.png";

import { Form, Text, VerticalBtn, Img, CommentSection, CommentArticle } from "./PostDetail.style";

export default function PostDetail() {
  const [postComments, setPostComments] = useState([]);
  const [commentInputValue, setCommentInputValue] = useState("");
  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState("");

  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  const { isBottomSheetOpen, setBottomSheetOpen } = useContext(BottomSheetContext);

  const { userInfo } = useContext(UserInfo);
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const { data: post, isLoading } = useFetch(`post/${postId}`, "GET");
  const { username, accountname } = userInfo;
  const [commentsLength, setCommentsLength] = useState(0);
  const pageEnd = useRef(null);
  const { getData, page } = useInfiniteScroll(`post/${postId}/comments`, pageEnd);

  useEffect(() => {
    if (post) setCommentsLength(post.commentCount);
  }, [post]);

  useEffect(() => {
    getData(page).then((json) => {
      setPostComments((prev) => {
        return prev.length === 0 ? json.comments : [...prev, ...json.comments];
      });
    });
  }, [page]);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setIsDeleteCommentModalOpen(false);
  });

  const addComment = (newComment) => {
    setPostComments((prevComments) => [newComment, ...prevComments]);
    setCommentsLength((prevLength) => prevLength + 1);
    setCommentInputValue("");
  };

  const calculateElapsedTime = (timestamp) => {
    const createdTime = new Date(timestamp).getTime();
    const currentTime = new Date().getTime();
    const elapsedMilliseconds = currentTime - createdTime;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);

    if (elapsedDays > 7) {
      return `${Math.floor(elapsedDays / 7)}주 전`;
    } else if (elapsedDays > 0) {
      return `${elapsedDays}일 전`;
    } else if (elapsedHours > 0) {
      return `${elapsedHours}시간 전`;
    } else if (elapsedMinutes > 0) {
      return `${elapsedMinutes}분 전`;
    } else {
      return "방금 전";
    }
  };

  const handleOpenModal = (commentId) => {
    setTargetCommentId(commentId);
    setIsDeleteCommentModalOpen(true);
  };

  // 댓글 작성
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (commentInputValue.trim() !== "") {
      const data = {
        comment: {
          content: commentInputValue,
        },
      };

      fetchApi(`post/${postId}/comments`, "POST", JSON.stringify(data)).then((res) => {
        addComment(res.comment);
      });
    }
  };

  // 댓글 삭제
  const deleteComment = async () => {
    const res = await fetchApi(`post/${postId}/comments/${targetCommentId}`, "delete");

    if (res.status === "200") {
      setIsDeleteCommentModalOpen(false);
      const filterComment = postComments.filter((v) => {
        return v.id !== targetCommentId;
      });

      setPostComments(filterComment);
      setCommentsLength((prev) => prev - 1);
    }
  };

  const heartHandler = async (postId, postHeart) => {
    if (postHeart) {
      heartButtonHandler.minus(postId);
    } else if (!postHeart) {
      heartButtonHandler.plus(postId);
    }
  };

  const deletePostHandler = () => {
    fetchApi(`post/${postId}`, "delete");
  };

  return (
    <>
      {post && !isLoading ? (
        <>
          {post && username === post.author.username ? <Header type="basic" setBottomSheetOpen={setBottomSheetOpen} /> : <Header type="back" />}
          <main>
            <article>
              <CardHeader image={post.author.image} username={post.author.username} accountname={post.author.accountname} />
              <CardContent post={post} heartHandler={heartHandler} commentCount={commentsLength} />
            </article>

            <CommentSection>
              <h2 className="a11y-hidden">댓글</h2>
              {postComments.length > 0 &&
                postComments.map((comment, index) => (
                  <CommentArticle key={index}>
                    <CardHeader image={comment.author.image} username={comment.author.username} accountname={comment.author.accountname} time={calculateElapsedTime(comment.createdAt)}>
                      {comment.author.accountname === accountname && (
                        <VerticalBtn type="button" className="more" onClick={() => handleOpenModal(comment.id)}>
                          <img src={IconMoreVertical} alt="더보기" width="22" height="22" />
                        </VerticalBtn>
                      )}
                    </CardHeader>
                    <Text>{comment.content}</Text>
                  </CommentArticle>
                ))}
              <div ref={pageEnd} />
            </CommentSection>

            <Form onSubmit={handleCommentSubmit}>
              <Img src={userInfo.image} alt="profileImg" onError={profileImgErrorHandler} />
              <input className="instaPost_input" type="text" placeholder="댓글 입력하기..." value={commentInputValue} onChange={(e) => setCommentInputValue(e.target.value)} />
              <button style={{ cursor: "pointer" }} className={commentInputValue ? "uploadBtn active" : "uploadBtn"} type="submit">
                게시
              </button>
            </Form>

            {isDeleteCommentModalOpen && (
              <AlertModal onSubmit={deleteComment} onCancel={setIsDeleteCommentModalOpen} submitText="삭제">
                댓글을 삭제할까요?
              </AlertModal>
            )}
            {isBottomSheetOpen && (
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
                <Link to={post && `../modify/${post.id}`} onClick={() => setBottomSheetOpen(false)}>
                  수정
                </Link>
              </BottomSheet>
            )}
            {isModalOpen && (
              <AlertModal
                submitText="삭제"
                onSubmit={() => {
                  deletePostHandler();
                  navigate(`/profile/${post.author.accountname}`);
                }}
              >
                게시글을 삭제할까요?
              </AlertModal>
            )}
          </main>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
