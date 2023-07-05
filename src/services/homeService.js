import axios from "axios";
import { BASE_URL } from "../contant/environments";
import axiosInstance from "../utils/axiosInstance";

export const homeService = {
  getHomePage() {
    return axiosInstance.get(`/pages/home`);
  },
  getFAQ() {
    return axiosInstance.get(`/questions`);
  },
  getGallery() {
    return axiosInstance.get(`/galleries`);
  },
};
