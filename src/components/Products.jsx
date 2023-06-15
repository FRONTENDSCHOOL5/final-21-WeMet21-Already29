import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function Products(props) {
  const userAccountName = props.userAccountName;
  const [productDatas, setProductDatas] = useState(null);

  async function fetchUserProducts() {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${userAccountName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    });
    const json = await res.json();

    const userProductItems = json.product;
    setProductDatas(userProductItems);
  }

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const nowKoreaTime = new Date(utc + koreaTimeDiff).toISOString();
  const nowDateArray = nowKoreaTime.split("T")[0].split("-");
  const nowTimeArray = nowKoreaTime.split("T")[1].slice(0, 8).split(":");

  return (
    <>
      {productDatas ? (
        productDatas.map((item) => {
          let when;
          // 유저가 게시글을 업데이트 한 [년, 월, 일]순으로 배열에 저장됨
          const updateDateArray = item.updatedAt.split("T")[0].split("-");
          // 유저가 게시글을 업데이트 한 [시, 분, 초]순으로 배열에 저장됨
          const updateTimeArray = item.updatedAt.split("T")[1].slice(0, 8).split(":");

          // 같은 년, 월, 일에 업데이트 되었는지 확인
          if (nowDateArray[0] === updateDateArray[0] && nowDateArray[1] === updateDateArray[1] && nowDateArray[2] === updateDateArray[2]) {
            // 같은 년, 월, 일에 업데이트 되었다면 시간, 분이 같은지 확인
            if (nowTimeArray[0] === updateTimeArray[0] && nowTimeArray[1] === updateTimeArray[1]) {
              // 같다면 몇초전인지 출력
              when = nowTimeArray[2] - updateTimeArray[2] + "초 전";
              // 시간이 같은지 확인
            } else if (nowTimeArray[0] === updateTimeArray[0]) {
              // 같다면 몇분전인지 출력
              when = nowTimeArray[1] - updateTimeArray[1] + "분 전";
            } else {
              // 모두 다르면 몇시간 전인지 출력
              when = nowTimeArray[0] - updateDateArray[0] + "시간 전";
            }
            // 같은 년, 월에 업데이트 되었는지 확인
          } else if (nowDateArray[0] === updateDateArray[0] && nowDateArray[1] === updateDateArray[1]) {
            // 같은 년, 월에 업데이트 되었다면 몇일전인지 출력
            when = nowDateArray[2] - updateDateArray[2] + "일 전";
            // 같은 년에 업데이트 되었는지 확인
          } else if (nowDateArray[0] === updateDateArray[0]) {
            // 같은 년에 업데이트 되었다면 몇달전인지 출력
            when = nowDateArray[1] - updateDateArray[1] + "달 전";
          } else {
            // 모든 조건이 부합하지 않으면 몇년전인지 출력
            when = nowDateArray[0] - updateDateArray[0] + "년 전";
          }

          return (
            <li key={item.id}>
              <Link to={`/product/detail/${item.id}`} draggable={false}>
                <div className="product-img-section">
                  <img src={item.itemImage} alt="상품 이미지" className="product-img" />
                </div>
                <div className="product-info-section">
                  <h3 className="product-title">{item.itemName}</h3>
                  <p className="product-price">{new Intl.NumberFormat().format(item.price)}원</p>
                </div>
                <span>{when}</span>
              </Link>
            </li>
          );
        })
      ) : (
        <Loading />
      )}
    </>
  );
}
