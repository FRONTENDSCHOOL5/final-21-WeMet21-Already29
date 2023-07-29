export default async function fetchApi(fetchUrl, fetchMethod, body) {
  try {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/${fetchUrl}`, {
      method: fetchMethod,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body: body,
    });

    const json = res.json();

    return json;
  } catch (e) {
    console.error(e);
  }
}
