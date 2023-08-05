import React, { useEffect, useState } from "react";

const useInfiniteScroll = (fetchPath, pageEnd) => {
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  console.log(page, hasMore);

  // Infinite scroll 관찰자 설정 및 업데이트
  useEffect(() => {
    // 관찰자 콜백: 리스트의 끝에 도달하면 새 데이터를 불러옴
    const observerCallback = (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreData();
      }
    };

    // 다음 페이지 데이터 불러오기
    const loadMoreData = async () => {
      if (!hasMore) return;

      setLoading(true);
      await getData(page);
      setLoading(false);

      if (hasMore) setPage((prev) => prev + 1);
    };

    if (pageEnd.current && !isLoading) {
      const observer = new IntersectionObserver(observerCallback, { threshold: 1 });
      observer.observe(pageEnd.current);

      // 컴포넌트 정리 시 관찰 중지
      return () => {
        if (pageEnd.current) {
          observer.unobserve(pageEnd.current);
        }
      };
    }
  }, [pageEnd.current, isLoading, hasMore, page]);

  // 추후 응답으로 구분되는 데이터 가져오기
  const getData = async (page) => {
    // 데이터 조회 API 요청
    const fetchData = async () => {
      const res = await fetch(`https://api.mandarin.weniv.co.kr/${fetchPath}/?limit=10&skip=${page * 10}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      return res.json();
    };

    // JSON 응답에서 데이터를 추출
    const extractData = (json) => {
      const dataKeys = ["data", "posts", "comments", "post"];

      for (const key of dataKeys) {
        if (json[key]) {
          return json[key];
        }
      }

      return json.length;
    };

    try {
      const json = await fetchData();
      const data = extractData(json);

      setHasMore(data >= 10);
      setLoading(false);

      return json;
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return { getData, page, setPage, hasMore };
};

export default useInfiniteScroll;
