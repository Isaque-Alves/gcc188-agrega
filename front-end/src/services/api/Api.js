import axios from "axios";
import { GetCookie } from "../../utils/CookieUtil";
const backUrl = "http://localhost:3001";
let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "OPTIONS");
// headers.append(
//   "Authorization",
//   GetCookie("token") ? `Bearer ${GetCookie("token")}` : undefined
// );

const Api = () => {
  return axios.create({
    baseURL: backUrl,
    headers: headers,
  });
};

export default Api;
