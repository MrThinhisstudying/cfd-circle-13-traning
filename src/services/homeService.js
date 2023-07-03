import axios from "axios";
import { BASE_URL } from "../contant/environments";

export const homeService = {
  getHomePage() {
    return axios.get(`${BASE_URL}/pages/home`);
  },
};
