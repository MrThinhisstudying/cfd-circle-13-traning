import axios from "axios";
import { BASE_URL } from "../contant/environments";
import { LOCAL_STORAGE } from "../contant/localStorage";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 || error.response.status === 403) {
      try {
        //Gọi API để cập nhật token mới
        const res = await axiosInstance.put(`/customer/refresh`, {
          refreshToken: localStorage.getItem(LOCAL_STORAGE.refreshToken),
        });

        const data = res?.data?.data;
        console.log("data: ", data);
        //Lưu lại token mới vào local storage
        localStorage.setItem(LOCAL_STORAGE.token, data?.token);
        localStorage.setItem(LOCAL_STORAGE.refreshToken, data?.refreshToken);

        //Thay đổi token trong header của yêu cầu ban đầu
        originalRequest.headers.Authorization = `Bearer ${data?.token}`;

        //Gọi lại yêu cầu ban đầu với token mới
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        //Xử lý nếu lỗi
        // Chuyển hướng người dùng đến trang login
      }
    }
    return Promise.reject(error);
  }
);

//Interceptor cho phép can thiệt vào quá trình gửi yêu cầu (REQUEST) từ server
axiosInstance.interceptors.request.use(
  (config) => {
    //Xử lý yêu cầu trước khi gửi đi
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      LOCAL_STORAGE.token
    )}`;
    return config;
  },
  (error) => {
    //Xử lý lỗi nếu có
    return Promise.reject(error);
  }
);

export default axiosInstance;
