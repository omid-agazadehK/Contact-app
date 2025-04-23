import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });
api.interceptors.request.use(
  (request) => {
    return request;
  },
  (erorr) => {
    return Promise.reject(erorr);
  }
);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (erorr) => {
    return Promise.reject(erorr);
  }
);
export default api;
