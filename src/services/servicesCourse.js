import axios from "axios";
import { BASE_URL } from "../contant/environments";

export const servicesCourse = {
  getCourses(query = "") {
    return axios.get(`${BASE_URL}/courses${query}`);
  },
  getCoursesBySlug(slug = "") {
    return axios.get(`${BASE_URL}/courses${slug ? "/" + slug : ""}`);
  },
};
