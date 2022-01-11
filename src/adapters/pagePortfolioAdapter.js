import http from "./httpService";

export const getTrendingCoins = () => {
  return http.get("/search/trending");
};
