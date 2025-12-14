export const loadNews = () => {
  return JSON.parse(localStorage.getItem("nnn_news") || "[]");
};
export const saveNews = (data) => {
  localStorage.setItem("nnn_news", JSON.stringify(data || []));
};
export const loadAds = () => {
  return JSON.parse(localStorage.getItem("nnn_ads") || "[]");
};
export const saveAds = (data) => {
  localStorage.setItem("nnn_ads", JSON.stringify(data || []));
};
