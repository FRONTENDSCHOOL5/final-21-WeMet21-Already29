import React, { useContext, useEffect, useRef, useState } from "react";
import profileImg from "../../assets/images/profileImg.png";
import IconMoreVertical from "../../assets/images/IconMoreVertical.png";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";
import { Form, Text, VerticalBtn, Img, CommentSection, CommentArticle } from "./PostDetailStyle";
import Header from "../../components/Header/Header";
import BottomSheetContext from "../../contexts/ModalContext/BottomSheetContext";
import BottomSheet from "../../components/Modal/BottomSheet/BottomSheet";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import { useParams } from "react-router";
import { heartButtonHandler } from "../../utils/heartButtonHandler";
import { Link, useNavigate } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { profileImgErrorHandler } from "../../utils/imageErrorHandler";
import CardHeader from "../../components/Card/CardHeader/CardHeader";
import CardContent from "../../components/Card/CardContent/CardContent";
import fetchApi from "../../utils/fetchApi";
import UserInfo from "../../contexts/LoginContext";

export default function PostDetail() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [CommentModalOpen, setCommentModalOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState("");
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const { isBottomSheetOpen, setBottomSheetOpen } = useContext(BottomSheetContext);
  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  const { userInfo } = useContext(UserInfo);

  // 나의 username
  const { username, accountname } = userInfo;

  const pageEnd = useRef(null);
  const { getData, page } = useInfiniteScroll(`post/${postId}/comments`, pageEnd);

  const fetchPost = () => {
    fetchApi(`post/${postId}`).then((res) => setPost(res.post));
  };
  console.log(post);

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    getData(page).then((json) => {
      console.log(comments);
      setComments((prev) => {
        return prev.length === 0 ? json.comments : [...prev, ...json.comments];
      });
    });
  }, [page]);

  const addComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    setComment("");
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

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    fetchPost();
  };

  const handleOpenModal = (commentId) => {
    setTargetCommentId(commentId);
    setCommentModalOpen(true); // 모달 오픈
  };

  // 댓글 작성
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() !== "") {
      const data = {
        comment: {
          content: comment,
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
      setCommentModalOpen(false);
      const filterComment = comments.filter((v) => {
        console.log(v.id);
        return v.id !== targetCommentId;
      });

      setComments(filterComment);
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
      {post && username === post.author.username ? <Header type="basic" setBottomSheetOpen={setBottomSheetOpen} /> : <Header type="back" />}
      <main>
        <article>
          {post && (
            <>
              <CardHeader image={post.author.image} username={post.author.username} accountname={post.author.accountname} />
              <CardContent post={post} heartHandler={heartHandler} />
            </>
          )}
        </article>

        <CommentSection>
          <h2 className="a11y-hidden">댓글</h2>
          {comments.length > 0 &&
            comments.map((comment, index) => (
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
          {/* <Label htmlFor="file-sync" className="file-sync"></Label>
            <input type="file" id="file-sync" accept=".png, .jpg, .jpeg" multiple hidden /> */}
          <Img src={userInfo.image} alt="profileImg" onError={profileImgErrorHandler} />
          <input className="instaPost_input" type="text" placeholder="댓글 입력하기..." value={comment} onChange={handleCommentChange} />
          <button style={{ cursor: "pointer" }} className={comment ? "uploadBtn active" : "uploadBtn"} type="submit">
            게시
          </button>
        </Form>
        {CommentModalOpen && <AlertModal onSubmit={deleteComment} onCancel={() => setCommentModalOpen(false)} submitText="삭제" children="댓글을 삭제할까요?" />}
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
              setModalOpen(false);
            }}
            onCancel={() => setModalOpen(false)}
          >
            게시글을 삭제할까요?
          </AlertModal>
        )}
      </main>
    </>
  );
}
