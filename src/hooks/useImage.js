import { useState } from "react";

const baseURL = "https://api.mandarin.weniv.co.kr";

// 파일 검사 함수
function isValidFile(file) {
  if (!file) return;
  const fileNameArray = file.name.split(".");
  const fileExtension = fileNameArray[fileNameArray.length - 1];
  const fileExtensionValues = ["jpg", "gif", "png", "jpeg", "bmp", "tif", "heic"];

  // 확장자 검사
  if (!fileExtensionValues.includes(fileExtension)) {
    alert("이미지 파일만 업로드 가능합니다.");
    return false;
    // 파일 용량 검사
  } else if (file.size > 10000000) {
    alert("10MB 미만의 파일만 업로드 가능합니다.");
    return false;
  } else {
    return true;
  }
}

export function useMultiImage() {
  const [image, setImage] = useState(null);

  async function inputImageHandler(e) {
    const formData = new FormData();
    const userImage = e.target.files[0];

    if (!isValidFile(userImage)) return;

    formData.append("image", userImage);

    const imageArray = image && image.split(",");
    if (image && imageArray.length >= 3) {
      alert("3장까지 업로드 가능합니다.");
      return;
    }

    const res = await fetch(`${baseURL}/image/uploadfile`, {
      method: "post",
      body: formData,
    });
    const json = await res.json();

    setImage((prev) => (prev ? prev + `,${baseURL}/${json.filename}` : `${baseURL}/${json.filename}`));
  }
  // image: string, setImage(): void, inputImagehandler(): void
  // image: 이미지 url을 ',' 기준으로 나눈 문자열 상태입니다. 최대 3개의 url을 받을 수 있습니다.
  // inputImageHandler: 이벤트 객체를 받아 처리하는 함수입니다.
  // 반환값은 없으며 이미지 상태를 업데이트 해줍니다.

  return { image, setImage, inputImageHandler };
}

export function useImage(initial) {
  const [image, setImage] = useState(initial || null);

  async function inputImageHandler(e) {
    const formData = new FormData();
    const userImage = e.target.files[0];

    if (!isValidFile(userImage)) return;

    formData.append("image", userImage);

    const res = await fetch(`${baseURL}/image/uploadfile`, {
      method: "post",
      body: formData,
    });
    const json = await res.json();

    setImage(`${baseURL}/${json.filename}`);
  }
  // image: string, setImage(): void, inputImagehandler(): void
  return { image, setImage, inputImageHandler };
}
