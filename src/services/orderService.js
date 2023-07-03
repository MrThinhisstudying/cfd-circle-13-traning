import axios from "axios";
import { BASE_URL } from "../contant/environments";

export const orderService = {
  getCourseHistory(token = "") {
    return axios.get(`${BASE_URL}/orders/courses/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getPaymentHistories(token = "") {
    return axios.get(`${BASE_URL}/orders/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
