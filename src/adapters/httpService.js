import axios from "axios";

axios.defaults.baseURL = "https://api.coingecko.com/api/v3";

const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};

export default http;
