import Cookies from "js-cookie";

const SetCookie = (key, value, options) => {
  return Cookies.set(key, value, options);
};

const GetCookie = (key) => {
  return Cookies.get(key);
};

const RemoveCookie = (key) => {
  return Cookies.remove(key);
};

export { SetCookie, GetCookie, RemoveCookie };
