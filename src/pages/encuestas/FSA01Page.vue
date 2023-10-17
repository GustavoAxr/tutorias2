<script setup>
import { ref, reactive, onMounted } from "vue";
import Alerts from "src/utils/Alerts";
import { getCuestionarioTutorado, agregarInforme } from "src/api/apiTutorias";
import ModalComponents from "src/components/ModalComponents.vue";

const visible = ref(true);
const modal = ref(false);
const step = ref(0);

const data = reactive({
  cuestionarioTutorado: [],
});

onMounted(async () => {
  await getFormularioTutorado();
});

const menu = [
  {
    icon: "newspaper",
    title: "INFORMACIÓN GENERAL DEL TUTORADO.",
    data: data,
  },
  {
    icon: "payents",
    title: "I. ASPECTOS SOCIOECONOMICOS.",
    data: data,
  },
  {
    icon: "engineering",
    title: "II. ASPECTOS PERSONALES",
    data: data,
  },
  {
    icon: "school",
    title: "III. ASPECTOS ACADEMICOS",
    data: data,
  },
];
const getFormularioTutorado = async () => {
  await getCuestionarioTutorado()
    .then((response) => {
      // visible.value = true;
      data.cuestionarioTutorado = response.data.informacionGeneralDeltutorado;
      Alerts.solounFormulario();
    })

    .finally(() => {
      visible.value = false;
    });
};

const guardarFormulario = async () => {
  modal.value = true;
  const formData = {
    id_alumno: 5, //!ID ESTATICO
    respuesta: JSON.stringify(data.cuestionarioTutorado),
    vulnerable: null,
    aspecto_socioeconomico: null,
    aspecto_personal: null,
    aspecto_academico: null,
    observacion_tutor: null,
  };
  await agregarInforme(formData)
    .then((response) => {
      if (response.mensaje === "OK") {
        Alerts.agregado();
        console.log(response);
      } else {
        Alerts.existe();
        console.log(response);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

// const resetCuestionario1 = () => {
//   switch (step.value) {
//     case 1:

//       break;

//     default:
//       break;
//   }
//   data.cuestionarioTutorado.map((x) => {
//     const modelo = (x.model = null);
//     console.log(modelo);
//   });
// };
</script>

<template>
  <ModalComponents
    v-model="modal"
    persistent
    funcion-realizar="Añadir datos"
    :datos="'Recuerde que solamente se puede enviar una vez'"
    @submit="guardarFormulario"
  />

  <div class="q-pa-md">
    <div class="q-pb-md text-h6 text-right">
      INSTRUMENTO PARA LA EVALUACIÓN GENERAL DEL TUTORADO
    </div>
    <q-stepper v-model="step" ref="stepper" contracted color="primary" animated>
      <q-step
        v-for="(menu, index) in menu"
        :key="index"
        :name="index"
        :icon="menu.icon"
        :done="step > 2"
      >
        <div class="text-h6 text-center">{{ menu.title }}</div>
        <div class="row" v-if="step === 0">
          <div
            v-for="(item, index) in data.cuestionarioTutorado.primerFormulario"
            :key="index"
            class="q-pa-sm col-12 col-md-4"
          >
            <span class="text-subtitle2">
              {{ item.pregunta }}
            </span>
            <q-select
              v-if="item.select"
              dense
              outlined
              label="Seleccione una opción"
              :type="item.tipo"
              v-model="item.respuesta"
              :options="item.select"
              clearable
            />

            <q-input
              v-else
              dense
              outlined
              label="Escribe tu respuesta aquí"
              v-model="item.respuesta"
              :prefix="item.prefix"
              :type="item.tipo"
              :mask="item.mask"
            />
          </div>
        </div>

        <div class="row" v-else-if="step === 1">
          <div
            v-for="(item, index) in menu.data.cuestionarioTutorado
              .aspectosSocioeconomicos"
            :key="index"
            class="q-pa-sm col-12 col-md-4"
          >
            <span class="text-subtitle2">{{ item.pregunta }}</span>

            <q-select
              v-if="item.select"
              dense
              outlined
              label="Selecciona tu respuesta"
              :type="item.tipo"
              v-model="item.respuesta"
              :options="item.select"
              clearable
            />
            <q-input
              v-else
              dense
              outlined
              label="Escribe tu respuesta aquí"
              v-model="item.respuesta"
              :prefix="item.prefix"
              :type="item.tipo"
              :mask="item.mask"
            />
          </div>
        </div>
        <div class="row" v-else-if="step === 2">
          <div
            v-for="(aspectosPersonales, index) in menu.data.cuestionarioTutorado
              .aspectosPersonales"
            :key="index"
            class="q-pa-sm col-12 col-md-4"
          >
            <span class="text-subtitle2"
              >{{ aspectosPersonales.pregunta }}
            </span>
            <q-select
              v-if="aspectosPersonales.select"
              dense
              outlined
              label="Selecciona tu respuesta"
              v-model="aspectosPersonales.respuesta"
              :options="aspectosPersonales.select"
              clearable
            />
            <q-input
              v-else
              dense
              outlined
              label="Escribe tu respuesta aquí"
              :prefix="aspectosPersonales.prefix"
              v-model="aspectosPersonales.respuesta"
            />
          </div>
        </div>
        <div class="row" v-else-if="step === 3">
          <div
            v-for="(aspectosAcademicos, index) in menu.data.cuestionarioTutorado
              .aspectosAcademicos"
            :key="index"
            class="q-pa-sm col-12 col-md-4"
          >
            <span>{{ aspectosAcademicos.pregunta }}</span>
            <q-select
              v-if="aspectosAcademicos.select"
              dense
              outlined
              label="Selecciona tu respuesta"
              v-model="aspectosAcademicos.respuesta"
              :options="aspectosAcademicos.select"
              clearable
              multiple
            />
            <q-input
              v-else
              dense
              outlined
              label="Escribe tu respuesta aquí"
              :prefix="aspectosAcademicos.prefix"
              v-model="aspectosAcademicos.respuesta"
            />
            <!-- {{ aspectosAcademicos }} -->
          </div>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step === 3"
            @click="modal = true"
            color="primary"
            label="Finalizar"
          />
          <q-btn
            v-else
            @click="$refs.stepper.next()"
            color="red"
            label="Continuar"
          />
          <q-btn
            v-if="step > 0"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Regresar"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
    <q-inner-loading :showing="visible">
      <q-spinner-pie color="primary" size="80px" />
    </q-inner-loading>
  </div>
</template>
