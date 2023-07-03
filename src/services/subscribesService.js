import axios from "axios";
import React from "react";
import { BASE_URL } from "../contant/environments";

export const subscribesService = {
  subscribes(payload = {}) {
    return axios.post(`${BASE_URL}/subscribes`, payload);
  },
};
