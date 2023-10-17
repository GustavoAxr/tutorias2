<script setup>
import { reactive, ref, onMounted } from "vue";
import { useStoreUser } from "src/stores/storeUser";
import { useStore } from "src/stores/store";
// import { encryptData, switchCase } from "src/utils/Utils";
import { useRouter } from "vue-router";
import Alerts from "src/utils/Alerts";
import { getAllCarreras, getCuatrimestres } from "src/api/apiTutorias";
// import { login } from "src/api/apiTutorias";

const router = useRouter();

const loading = ref(false);
const esClave = ref(true);
const isLogin = ref(true);
const visible = ref(false);
// const storeUser = useStoreUser();
const store = useStore();
const _datos = {
  matricula: null,
  nombre: null,
  apellido: null,
  sexo: null,
  correo: "" + "@utcam.edu.mx",
  clave: null,
  cuatrimestre: null,
  grupo: null,
  programa: null,
  foto: null,
  mantenerSesion: false,
};
const carreras = ref([]);
const cuatrimestres = ref([]);

onMounted(async () => {
  await getAllCarreras()
    .then((response) => {
      if (response.mensaje === "OK") {
        carreras.value = response.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  await getCuatrimestres()
    .then((response) => {
      cuatrimestres.value = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

const datos = reactive({ ..._datos });

async function onSubmit() {
  visible.value = true;
  console.log(datos);
  router.push({ path: "/tutorias/inicio" }).catch((e) => Alerts.error(e));
}
const guardarUsuario = () => {
  visible.value = true;
  console.log(datos);
};

// function proyectoSeleccionado(value) {
//   store.agregarSeleccion(value);
// }
</script>
<template>
  <img src="src/assets/img/wave.png" class="wave" alt="login-wave" />
  <div>
    <div class="fixed-center">
      <q-card
        v-if="isLogin == true"
        class="login animate__animated animate__pulse"
        flat
        bordered
      >
        <q-form @submit="onSubmit" class="q-gutter-sm">
          <q-card-section>
            <q-card-section class="text-center">
              <img src="src/assets/img/logo-utcam.png" class="img-logo" />
            </q-card-section>
            <q-card-section>
              <q-input
                outlined
                type="text"
                v-model="datos.correo"
                label="Correo"
                autofocus
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                outlined
                class="q-mt-sm"
                v-model="datos.clave"
                label="Clave"
                autocomplete="on"
                :type="esClave ? 'password' : 'text'"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="esClave ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="esClave = !esClave"
                  />
                </template>
              </q-input>

              <q-toggle
                v-model="datos.mantenerSesion"
                label="Mantener sesión iniciada"
              />
            </q-card-section>

            <q-card-section class="text-center">
              <q-btn
                label="Iniciar"
                type="submit"
                color="primary"
                class="full-width"
              />
              <br />
              <br />
              <span @click="isLogin = false">Registrarse</span>
            </q-card-section>
          </q-card-section>
        </q-form>

        <q-inner-loading :showing="loading">
          <q-linear-progress indeterminate class="aling-progress" />
        </q-inner-loading>
      </q-card>
      <!-- *---------------------------------------------------------------------- -->
      <q-card
        v-else
        class="login animate__animated animate__pulse"
        flat
        bordered
      >
        <q-form @submit="guardarUsuario" class="q-gutter-sm">
          <q-card-section>
            <div class="text-center">
              <img src="src/assets/img/logo-utcam.png" class="img-logo" />
            </div>
            <div class="row q-col-gutter-sm">
              <q-input
                class="col-12 col-md-6"
                dense
                outlined
                type="number"
                v-model="datos.matricula"
                label="Matricula"
              />
              <q-input
                class="col-12 col-md-6"
                dense
                outlined
                v-model="datos.nombre"
                label="Nombre"
              />

              <q-input
                class="col-12 col-md-6"
                dense
                outlined
                type="text"
                v-model="datos.apellido"
                label="Apellidos"
              />
              <q-select
                class="col-12 col-md-6"
                dense
                outlined
                v-model="datos.sexo"
                label="Sexo"
                :options="['Masculino', 'Femenino']"
              >
              </q-select>

              <q-input
                class="col-12 col-md-6"
                dense
                outlined
                type="email"
                v-model="datos.correo"
                label="Correo"
                suffix="@utcam.edu.mx"
              >
              </q-input>
              <q-input
                class="col-12 col-md-6"
                dense
                outlined
                v-model="datos.clave"
                label="Clave"
                autocomplete="on"
                :type="esClave ? 'password  ' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="esClave ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="esClave = !esClave"
                  />
                </template>
              </q-input>

              <q-select
                class="col-12"
                dense
                outlined
                v-model="datos.cuatrimestre"
                label="Programa educativo"
                :options="carreras"
              />
              <q-select
                class="col-12"
                dense
                outlined
                v-model="datos.grupo"
                label="Grupo"
                :options="cuatrimestres"
              />
              <!-- <ArraytoString
                :selected="store.opcionSeleccionada"
                :items="carreras"
                titulo="Plan de estudio"
                @valor="proyectoSeleccionado"
              /> -->
            </div>

            <q-card-section class="text-center">
              <q-btn
                label="Iniciar"
                type="submit"
                color="primary"
                class="full-width"
              />
              <br />
              <br />
              <span @click="isLogin = true">Inicia sesión</span>
            </q-card-section>
          </q-card-section>
        </q-form>
      </q-card>
      <q-inner-loading :showing="visible">
        <q-spinner-pie color="primary" size="60px" />
      </q-inner-loading>
    </div>
  </div>
</template>

<style scoped>
.wave {
  position: fixed;
  transform: rotate(180deg);
  height: 45%;
  width: 100%;
  left: 0;
  bottom: 200;
  z-index: -1;
}

.aling-progress {
  margin-top: -515px;
}

.img-logo {
  width: 180px;
  height: 90px;
}
</style>
