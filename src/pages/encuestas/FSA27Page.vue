<script setup>
import { ref, reactive, onMounted } from "vue";
import {
  getCuestionarioEvaluacion,
  guardarRespuesta,
  getDatosAlumnoPorId,
} from "src/api/apiTutorias";
import SectionComponents from "src/components/encuestas/SectionComponents.vue";
import Alerts from "src/utils/Alerts";

const data = reactive({
  cuestionarioEvaluacionTutor: [],
  periodo: null,
  grado_grupo: null,
});
onMounted(() => {
  getCuestionarioEvaluacion().then((res) => {
    data.cuestionarioEvaluacionTutor = res.data;
  });

  obtenerDatosPoralumno();
});

const submit = async () => {
  const formData = {
    id_alumno: 5,
    respuesta: JSON.stringify(data.cuestionarioEvaluacionTutor),
  };
  await guardarRespuesta(formData)
    .then((res) => {
      if (res.mensaje === "OK") {
        Alerts.cuestionarioAgregado();
        console.log(res);
      } else {
        Alerts.existe();
        console.log(res);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const reset = () => {
  data.cuestionarioEvaluacionTutor.preguntas.map((x) => {
    if (x.respuesta != null) {
      x.respuesta = null;
    }
  });
};
//el parametro resivira la sesion
const obtenerDatosPoralumno = async () => {
  await getDatosAlumnoPorId(5).then((response) => {
    console.log(response);
    data.periodo = response.data[0].nombre_periodo;
    data.grado_grupo = response.data[0].grado_grupo;
  });
};
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <div class="text-h6 text-right">
        INSTRUMENTO PARA EVALUAR EL DESEMPEÑO EN LA TUTORÍA
      </div>
      <div class="row">
        <q-input
          class="q-pa-sm col-12 col-md-6"
          label="Periodo"
          outlined
          dense
          :disable="data.periodo != null"
          v-model="data.periodo"
          :suffix="new Date().getUTCFullYear()"
        />
        <q-input
          class="q-pa-sm col-12 col-md-6"
          label="Cuatrimestre y grupo"
          outlined
          dense
          :disable="data.grado_grupo != null"
          v-model="data.grado_grupo"
        />
      </div>
      <section-components @reset="reset" @onSubmit="submit">
        <template #formulario>
          <div class="text-subtitle2">
            <b style="color: brown"> INSTRUCCIONES: </b>Seleccione la casilla
            que mas se acerque a su respuesta:
            <br />
            (1) Totalmente en desacuerdo (2) En desacuerdo (3) Más o menos de
            acuerdo (4) De acuerdo (5) Totalmente de acuerdo
          </div>

          <q-separator></q-separator>
          <ol>
            <li
              v-for="evaluacion in data.cuestionarioEvaluacionTutor.preguntas"
              :key="evaluacion.id"
            >
              <div class="text-h6">
                {{ evaluacion.pregunta }}
              </div>
              <br />
              <q-radio
                v-for="(puntos, index) in evaluacion.puntaje"
                :key="index"
                v-model="evaluacion.respuesta"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                :val="puntos"
                :label="puntos"
              />
            </li>
          </ol>

          <q-page-scroller scroll-offset="400" position="bottom">
            <q-btn fab icon="keyboard_arrow_up" color="red" />
          </q-page-scroller>
        </template>
      </section-components>
    </div>
  </q-page>
</template>
