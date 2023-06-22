import React, { useEffect, useState } from "react";

export default function useInfiniteScroll(fetchPath, pageEnd) {
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [isLoading]);

  const getData = async (page) => {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/${fetchPath}/?limit=10&skip=${page * 10}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    });
    setLoading(true);
    return res;
  };

  // 반환 값 getData() : promise | page : 현재 페이지 | isLoading : 현재 로딩 상태
  return { getData, page, isLoading };
}
