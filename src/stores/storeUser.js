import { defineStore } from "pinia";

export const useStoreUser = defineStore("storeUser", {
  state: () => ({
    token: null,
    img: null,
    dataUser: null,
    tokenMovil: null,
    dataMovil: null,
    pagina: null,
    descripcionPagina: null,
  }),
  getters: {},
  actions: {
    updatePage(name, descPagina = null) {
      this.pagina = name;
      this.descripcionPagina = descPagina;
    },
    actionCerrarSesion() {
      this.token = null;
      this.img = null;
      this.dataUser = null;
    },
    actionCerrarSesionMovil() {
      this.tokenMovil = null;
      this.dataMovil = null;
    },
  },
});
