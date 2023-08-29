import React, { useEffect, useRef } from "react";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";

import KaKaoImage from "../../../assets/images/kakao_share.webp";
import CloseImage from "../../../assets/images/Union.png";
import useScript from "../../../hooks/useScript";
import { CloseButton, KakaoIcon, KakaoShareButton, ShareBackdrop, ShareItemWrap, ShareModalWrap, UrlShareButton } from "./ShareModal.style";

export default function ShareModal({ setShareModalOpen }) {
  const firstEl = useRef(null);
  const lastEl = useRef(null);
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
  const currentUrl = window.location.href;
  // kakao sdk 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도합니다.
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init("7491e21fe4cdbdc373705bed5acf85bd");
      }
    }
  }, [status]);

  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };

  useEffect(() => {
    firstEl.current.focus();

    firstEl.current.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        lastEl.current.focus();
      }
    });
    lastEl.current.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        firstEl.current.focus();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setShareModalOpen(false);
    });
  }, []);

  const handleCopyClip = () => {
    window.alert("클립보드에 복사되었습니다.");
  };

  return (
    <ShareBackdrop
      onClick={(e) => {
        const componentClass = ShareBackdrop.styledComponentId;
        const targetClass = e.target.className;
        if (typeof targetClass === "string") {
          const sliceTargetClass = targetClass.slice(0, componentClass.length);
          componentClass === sliceTargetClass && setShareModalOpen(false);
        }
      }}
    >
      <ShareModalWrap>
        <h2>공유하기</h2>
        <ShareItemWrap>
          <FacebookShareButton url={currentUrl} ref={firstEl}>
            <FacebookIcon round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={currentUrl}>
            <TwitterIcon round={true} />
          </TwitterShareButton>
          <CopyToClipboard text={currentUrl}>
            <UrlShareButton onClick={handleCopyClip}>URL</UrlShareButton>
          </CopyToClipboard>
          <KakaoShareButton onClick={handleKakaoButton} tabIndex={0}>
            <KakaoIcon src={KaKaoImage} />
          </KakaoShareButton>
        </ShareItemWrap>
        <CloseButton type="button" onClick={() => setShareModalOpen(false)} ref={lastEl}>
          <img src={CloseImage} alt="닫기" />
        </CloseButton>
      </ShareModalWrap>
    </ShareBackdrop>
  );
}
