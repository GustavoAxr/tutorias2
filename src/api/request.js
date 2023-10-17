import axios from "axios";
import alert from "src/utils/Alerts";
import { SessionStorage } from "quasar";
import { decryptData } from "src/utils/Utils";

import { useStoreUser } from "src/stores/storeUser";
import { switchCase } from "src/utils/Utils";

export const request = (todo = false) => {
  const storeUser = useStoreUser();

  const VITE_BACKEND = import.meta.env.VITE_BACKEND;
  const autorizacion = SessionStorage.getItem("autorizacion");

  const service = axios.create({
    baseURL: VITE_BACKEND,
    headers: {
      Authorization: `Bearer ${autorizacion}`,
    },
    // (no timeout)
    timeout: 0,
  });

  service.interceptors.response.use(
    async function (response) {
      // console.log("response", response);
      switchCase(
        response.data.mensaje,
        {
          NOT_FOUNT_TOKEN: () => {
            window.location = "/#/login";
            alert.tokenExpiro();
            setTimeout(() => storeUser.cerrarSesion(), 500);
          },
        },
        false
      );

      return todo ? response : response.data;
    },
    async function (error) {
      alert.error(error);
      return Promise.reject(error);
    }
  );
  return service;
};
export default {
  request,
};

// return requestARS.post("web/login_web", datos);

// OTRA FORMA DE HACER PETICIONES
// return requestARS({
//   url: "loginWeb",
//   method: "post",
//   datos
// })
