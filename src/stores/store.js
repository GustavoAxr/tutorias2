import { defineStore } from "pinia";

export const useStore = defineStore("storeMain", {
  state: () => ({
    counter: 0,
    darkMode: false,
    rol: null,
    opcionSeleccionada: null,
    personal: null,
  }),
  getters: {},

  actions: {
    cambiarTema(tema) {
      this.darkMode = tema;
    },

    cambioRol(nuevo) {
      this.rol = nuevo;
    },

    agregarSeleccion(nuevo) {
      this.opcionSeleccionada = nuevo;
    },
    listaPersonal(nuevo) {
      this.personal = nuevo;
    },
  },
});
