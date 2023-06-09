export default function uploadDateCalculate(updateDate) {
  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const nowKoreaTime = new Date(utc + koreaTimeDiff).toISOString();
  const nowDateArray = nowKoreaTime.split("T")[0].split("-");
  const nowTimeArray = nowKoreaTime.split("T")[1].slice(0, 8).split(":");
  // 유저가 게시글을 업데이트 한 [년, 월, 일]순으로 배열에 저장됨
  const updateDateArray = updateDate.split("T")[0].split("-");
  // 유저가 게시글을 업데이트 한 [시, 분, 초]순으로 배열에 저장됨
  const updateTimeArray = updateDate.split("T")[1].slice(0, 8).split(":");
  // 같은 년, 월, 일에 업데이트 되었는지 확인
  if (nowDateArray[0] === updateDateArray[0] && nowDateArray[1] === updateDateArray[1] && nowDateArray[2] === updateDateArray[2]) {
    // 같은 년, 월, 일에 업데이트 되었다면 시간, 분이 같은지 확인
    if (nowTimeArray[0] === updateTimeArray[0] && nowTimeArray[1] === updateTimeArray[1]) {
      // 같다면 몇초전인지 출력
      return nowTimeArray[2] - updateTimeArray[2] + "초 전";
      // 시간이 같은지 확인
    } else if (nowTimeArray[0] === updateTimeArray[0]) {
      // 같다면 몇분전인지 출력
      return nowTimeArray[1] - updateTimeArray[1] + "분 전";
    } else {
      // 모두 다르면 몇시간 전인지 출력
      return nowTimeArray[0] - updateTimeArray[0] + "시간 전";
    }
    // 같은 년, 월에 업데이트 되었는지 확인
  } else if (nowDateArray[0] === updateDateArray[0] && nowDateArray[1] === updateDateArray[1]) {
    // 같은 년, 월에 업데이트 되었다면 몇일전인지 출력
    return nowDateArray[2] - updateDateArray[2] + "일 전";
    // 같은 년에 업데이트 되었는지 확인
  } else if (nowDateArray[0] === updateDateArray[0]) {
    // 같은 년에 업데이트 되었다면 몇달전인지 출력
    return nowDateArray[1] - updateDateArray[1] + "달 전";
  } else {
    // 모든 조건이 부합하지 않으면 몇년전인지 출력
    return nowDateArray[0] - updateDateArray[0] + "년 전";
  }
}
