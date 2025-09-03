const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

//共用youtube的api
export const fetchApi = async (endPoint, params = {}) => {
  const url = new URL(`${BASE_URL}/${endPoint}`);
  params.key = API_KEY;

  //因為會有不同的參數需要傳遞，所以用forEach去跑
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error('API 請求失敗');
  return res.json();
};
