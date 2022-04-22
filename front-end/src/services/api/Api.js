import axios from "axios";
import { GetCookie } from "../../utils/CookieUtil";
const backUrl = "http://localhost:3001";

const Api = () => {
  return axios.create({
    baseURL: backUrl,
    headers: {
      Authorization: GetCookie("token") ? GetCookie("token") : undefined,
    },
  });
};

export default Api;
