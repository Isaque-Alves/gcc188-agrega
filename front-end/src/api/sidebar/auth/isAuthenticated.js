import { getUser } from "../../../services/api/Auth";

const isAuthenticated = async () => {
  let auth = false;
  await getUser()
    .then((resp) => {
      if (resp.status == 200) {
        auth = true;
      }
    })
    .catch((err) => {
      if (err.response.data.msg == "Não autenticado") {
        auth = false;
      }
    });
  return auth;
};

export default isAuthenticated;
