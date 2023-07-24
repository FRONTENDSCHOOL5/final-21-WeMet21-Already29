export default function uploadDateCalculate(dataUpdatedAt) {
  function parseDateTime(dateTime) {
    const dateArray = dateTime.split("T")[0].split("-");
    const timeArray = dateTime.split("T")[1].slice(0, 8).split(":");
    return {
      year: dateArray[0],
      month: dateArray[1],
      date: dateArray[2],
      hour: timeArray[0],
      min: timeArray[1],
      sec: timeArray[2],
    };
  }

  const convertToKoreaTime = (time) => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60 * 1000;
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    return new Date(utc + koreaTimeDiff).toISOString();
  };

  const nowKoreaTime = convertToKoreaTime(new Date());
  const nowDateData = parseDateTime(nowKoreaTime);
  const updatedDateData = parseDateTime(dataUpdatedAt);

  let result;

  // 같은 년, 월, 일에 업데이트되었는지 확인
  const isSameDate = Object.entries(nowDateData)
    .slice(0, 3)
    .every(([key, value]) => updatedDateData[key] === value);

  console.log(nowDateData, updatedDateData);

  if (isSameDate) {
    const { hour: nowHour, min: nowMin, sec: nowSec } = nowDateData;
    const { hour: updateHour, min: updateMin, sec: updateSec } = updatedDateData;

    const diffSec = nowMin === updateMin ? nowSec - updateSec : 60 - Number(updateSec) + Number(nowSec);
    const diffMin = nowHour + nowMin - (updateHour + updateMin);
    const diffHour = parseInt(diffMin / 60);

    if (diffHour === 0) {
      if (diffMin === 0) {
        diffSec < 5 ? (result = "방금 전") : (result = diffSec + "초 전");
      } else {
        result = diffMin + "분 전";
      }
    } else {
      result = diffHour + "시간 전";
    }
  } else {
    const { year: updateYear, month: updateMonth, date: updateDate } = updatedDateData;
    const { year: nowYear, month: nowMonth, date: nowDate } = nowDateData;

    if (nowYear === updateYear) {
      if (nowMonth === updateMonth) {
        result = nowDate - updateDate + "일 전";
      } else {
        result = nowMonth - updateMonth + "달 전";
      }
    } else {
      result = nowYear - updateYear + "년 전";
    }
  }

  return result;
}
