import http from "./httpService";

export const getAllCryptoCurrencyData = () => {
  return http.get("/coins/markets?vs_currency=usd&order=market_cap_desc");
};

export const getTrendingCoins = () => {
  return http.get("/search/trending");
};

export const searchCoins = (query) => {
  return http.get(`/search?query=${query}`);
};
