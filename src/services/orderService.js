import axios from "axios";
import { BASE_URL } from "../contant/environments";
import axiosInstance from "../utils/axiosInstance";

export const orderService = {
  getCourseHistory() {
    return axiosInstance.get(`/orders/courses/me`);
  },
  getPaymentHistories() {
    return axiosInstance.get(`/orders/me`);
  },
  orderCourse(payload = {}) {
    return axiosInstance.post(`/orders`, payload);
  },
};
