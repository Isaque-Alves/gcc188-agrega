import axios from "axios";
import { GetCookie } from "../../utils/CookieUtil";
const backUrl = process.env.REACT_APP_URL_BACKEND;

const Api = () => {
  return axios.create({
    baseURL: backUrl,
    headers: {
      Authorization: GetCookie("token") ? GetCookie("token") : undefined,
    },
  });
};

export default Api;
