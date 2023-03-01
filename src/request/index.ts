import axios from "axios";
import { useNavigate } from "react-router-dom";
// 创建axios实例
const instance = axios.create({
  // 基本请求路径的抽取
  baseURL: "http://localhost:8088/",
  // 这个时间是你每次请求的过期时间，这次请求认为20秒之后这个请求就是失败的
  timeout: 20000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    config.headers.token = localStorage.getItem("token");
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 401) {
      localStorage.removeItem("token");
      return;
    }

    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
