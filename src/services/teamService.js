import axios from "axios";
import { BASE_URL } from "../contant/environments";

export const teamService = {
  getTeam() {
    return axios.get(`${BASE_URL}/teams`);
  },
};
