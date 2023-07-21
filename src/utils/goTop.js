export default function goTop(itemLength) {
  const between = 3; // 이동 간격 시간
  console.log(itemLength * 2.5);
  const scroll = window.setInterval(function () {
    const pos = window.pageYOffset;
    const step = itemLength ? itemLength * 2.5 : 50; // 이동 크기 픽셀
    if (pos > 0) {
      window.scrollTo(0, pos - step);
    } else {
      window.clearInterval(scroll);
    }
  }, between);
}
