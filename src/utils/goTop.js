export default function goTop() {
  const between = 3; // 이동 간격 시간

  const scroll = window.setInterval(function () {
    const pos = window.pageYOffset;
    const step = 50; // 이동 크기 픽셀
    if (pos > 0) {
      window.scrollTo(0, pos - step);
    } else {
      window.clearInterval(scroll);
    }
  }, between);
}
