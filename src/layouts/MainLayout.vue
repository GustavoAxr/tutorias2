<script setup>
import EssentialLink from "src/components/EssentialLink.vue";
import { ref, onMounted, reactive } from "vue";
import menu from "assets/json/menu.json";
import { useRouter } from "vue-router";
import { useStore } from "src/stores/store.js";
import DarkMode from "src/components/DarkMode.vue";

const _datos = {
  nombre: null,
  tutor: null,
  matricula: null,
  correo: null,
  contrasena: null,
  carrera: null,
};

const datos = reactive({ ..._datos });

import { getDatosAlumnoPorIdConTutor } from "../api/apiTutorias";
import { data } from "autoprefixer";

onMounted(async () => {
  await getDatosAlumnoPorIdConTutor(5).then((response) => {
    console.log(response.data);
    datos.nombre = response.data[0].nombre_alumno;
    datos.tutor = response.data[0].nombre_tutor;
    datos.matricula = response.data[0].matricula;
    datos.correo = response.data[0].correo;
    datos.contrasena = response.data[0].clave;
    datos.carrera = response.data[0].nombre_carrera;
  });
});
const store = useStore();

// import { useStore } from "src/stores/store";
// import { useStoreUser } from "src/stores/storeUser";
// import Alerts from "src/utils/Alerts";

// const EssentialLink = defineAsyncComponent(() =>
//   import("./../components/EssentialLink.vue")
// );

const rightDrawerOpen = ref(false);
const leftDrawerOpen = ref(false);
const miniState = ref(true);
const image = ref(null);
const dataInputs = reactive({
  foto: null,
  statefocus: false,
  preview: false,
});
const inputFileImagen = ref("inputFileImagen");
const cargaImage = ref(false);

// const storeUser = useStoreUser();
const router = useRouter();

const menuWeb = menu["menu"];

const roles = ["Alumno", "Profesor", "Tutor", "Coordinador", "Director"];

store.cambioRol(store.rol);

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function cerrarSesion() {
  // storeUser.actionCerrarSesion();
  router.push({ path: "/" }).catch((e) => Alerts.error(e));
  //lHh lpr lFr
}

// function quitarImagen() {
//   image.value = null;
//   data.preview = image.value;
//   inputFileImagen.value.value = null;
// }

function vistaPreviaImagen(event) {
  var input = event.target;
  if (input.files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      dataInputs.preview = e.target.result;
    };
    image.value = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
  const archivo = event.target.files[0];
  const formData = new FormData();
  formData.append("foto", archivo);
  formData.append("id_anexo", data.dataProyecto.id);
  subirlogo(formData)
    .then((res) => {
      console.log("image", res.data);
    })
    .catch((e) => {
      aError(e);
    });
}
</script>

<template>
  <q-layout view="hHh Lpr lff">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-img
            src="src/assets/img/logo-utcam.png"
            width="30px"
            height="15px"
          />
          Tutorias
        </q-toolbar-title>
        <q-chip square>
          <q-avatar icon="bookmark" color="cyan" text-color="white" />
          <q-select :options="roles" v-model="store.rol" />
        </q-chip>
        <DarkMode />
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="300"
      :breakpoint="500"
    >
      <q-list>
        <EssentialLink
          v-for="link in menuWeb"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right">
      <q-item-label header> Datos personales </q-item-label>
      <div class="text-center">
        <input
          type="text"
          name="fotoAnterior"
          :value="dataInputs.foto"
          hidden
        />
        <input
          type="file"
          accept="image/*"
          ref="inputFileImagen"
          @change="vistaPreviaImagen"
          class="form-control-file"
          name="foto"
          hidden
        />
        <q-img
          @mouseenter="dataInputs.statefocus = true"
          @mouseleave="dataInputs.statefocus = false"
          class="my-img q-ma-none"
          size="15px"
          src="https://cdn-icons-png.flaticon.com/512/6073/6073873.png"
        >
          <div class="absolute-full" v-if="dataInputs.statefocus">
            <div
              class="text-subtitle2 flex flex-center"
              style="background-color: #fff"
              v-if="cargaImage"
            >
              <q-spinner color="grey-6" size="4em" />
            </div>
            <div
              class="absolute-full text-subtitle2 flex flex-center my-text"
              v-else
            >
              <q-btn
                icon="close"
                class="q-mr-sm"
                color="red"
                @click="quitarImagen"
                fab
              >
              </q-btn>
              <q-btn
                icon="image"
                fab
                color="primary"
                @click="inputFileImagen.click()"
              />
            </div>
          </div>
        </q-img>
        <br />
        <br />
        <div class="text-subtitle2">{{ datos.nombre }}</div>
        <div v-if="datos.tutor">
          <span>Tutor: </span>
          <div class="text-subtitle2">{{ datos.tutor }}</div>
        </div>
      </div>

      <div class="q-pa-md">
        <span>Matricula:</span>
        <div class="text-subtitle2">{{ datos.matricula }}</div>
        <br />
        <span>Correo: </span>
        <div class="text-subtitle2">{{ datos.correo }}</div>
        <br />
        <span>Contraseña:</span>
        <div class="text-subtitle2">{{ datos.contrasena }}</div>
        <br />
        <span>Programa educativo:</span>
        <div class="text-subtitle2">
          {{ datos.carrera }}
        </div>
      </div>
      <q-item-actions>
        <div class="q-pa-md">
          <q-btn
            outline
            color="primary"
            label="Cerrar sesión"
            class="full-width"
            @click="cerrarSesion"
          />
        </div>
      </q-item-actions>
    </q-drawer>
    <q-inner-loading
      :showing="visible"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
