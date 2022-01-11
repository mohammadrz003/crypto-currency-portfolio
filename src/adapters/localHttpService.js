import axios from "axios";
import axiox from "axios";

const localInstance = axios.create({
  baseURL: "http://localhost:3001",
});

const localHttp = {
  get: localInstance.get,
  post: localInstance.post,
  delete: localInstance.delete,
  put: localInstance.put,
};

export default localHttp;
