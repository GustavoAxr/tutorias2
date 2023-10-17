<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useStore } from "src/stores/store";

import TableComponent from "src/components/TableComponent.vue";
import ModalComponents from "src/components/ModalComponents.vue";
import {
  getAreasApoyosLista,
  obtenerPersonalPorId,
  crearActividad,
  obtenerActividades,
  actualizarActividad,
} from "../api/apiTutorias";
import { stringToArray } from "src/components/StringToArray";
import Alerts from "src/utils/Alerts";

const store = useStore();

const modal = ref(false);
const modalDatos = ref(false);
const clasesInputs = ref("col-md-6 col-sm-12 col-xs-12");
const instituciones = ref([]);
const instructores = ref([]);
const datosnuevos = ref([]);
const datosActividades = ref([]);
const institucion_seleccionada = ref(null);
const comportamiento_modal = ref(0); //* 0 = agregar  ||| 1 = actualizar
const quitarBanner = ref(true);

onMounted(async () => {
  await obtenerlistaDeAreas();
  await obtenerlistaDeActividades();
});

const _actividades = {
  id: null,
  id_area_apoyo: null,
  nombre_evento: null,
  proposito_conferencia: null,
  duracion: null,
  participantes: null,
  lugar_evento: 'Auditorio. "Rosa López Soto"',
  institucion_participante: null,
  foto: null,
  instructor: null,
  impacto: null,
  area_responsable: "Secretaría Académica. Lic. Gustavo García López.",
  estatus: null,
  motivo_rechazo: null,
  fecha: null,
};

const actividades = reactive({ ..._actividades });

const obtenerlistaDeAreas = async () => {
  await getAreasApoyosLista().then((response) => {
    instituciones.value = response.data;
  });
};

const obtenerlistaDeActividades = async () => {
  await obtenerActividades().then((response) => {
    datosActividades.value = response.data;
  });
};

const obtenerParticipantes = async () => {
  await obtenerPersonalPorId(
    institucion_seleccionada.value != null
      ? institucion_seleccionada.value
      : store.personal
  ).then((response) => {
    instructores.value = response.data[0].label;
    datosnuevos.value = stringToArray(instructores.value);
  });
};

watch(actividades, async (newValue) => {
  if (newValue.institucion_participante != null) {
    institucion_seleccionada.value = newValue.institucion_participante.value;
  }
  obtenerParticipantes();
});

const activarModal = (tipo = 0) => {
  modal.value = !modal.value;
  comportamiento_modal.value = tipo;
  if (tipo == 0) {
    reset();
  }
};

const cambioEstadoEditar = (data) => {
  store.listaPersonal(store.personal);
  store.personal = institucion_seleccionada.value;
  activarModal(1);
  verInfo(data);
};

const reset = () => {
  Object.assign(actividades, _actividades);
};

const submitFormulario = async () => {
  const formData = {
    // id_usuario: 7,
    id_area_apoyo: actividades.institucion_participante.value,
    nombre_actividad: actividades.nombre_evento,
    proposito: actividades.proposito_conferencia,
    duracion: actividades.duracion,
    participantes: actividades.participantes,
    // foto: actividades.foto,
    lugar_evento: actividades.lugar_evento,
    institucion_participante: actividades.institucion_participante.label,
    instructor_participante: actividades.instructor,
    impacto: actividades.impacto,
  };

  await crearActividad(formData).then((response) => {
    if (response.mensaje === "OK") {
      Alerts.agregado();
      obtenerlistaDeActividades();
      activarModal();
      reset();
    }
  });
};

const editarActividad = async () => {
  const formData = {
    id: actividades.id,
    // id_usuario: 7,
    id_area_apoyo:
      actividades.institucion_participante.value == null
        ? store.personal
        : actividades.institucion_participante.value,
    nombre_actividad: actividades.nombre_evento,
    proposito: actividades.proposito_conferencia,
    duracion: actividades.duracion,
    participantes: actividades.participantes,
    // foto: actividades.foto,
    lugar_evento: actividades.lugar_evento,
    institucion_participante:
      actividades.institucion_participante.label == null
        ? actividades.institucion_participante
        : actividades.institucion_participante.label,
    instructor_participante: actividades.instructor,
    impacto: actividades.impacto,
  };
  store.listaPersonal(store.personal);
  store.personal = institucion_seleccionada.value;

  await actualizarActividad(formData).then((response) => {
    Alerts.actualizado();
    activarModal(1);
    obtenerlistaDeActividades();
  });
};
const mostrarDatosModal = (data) => {
  modalDatos.value = !modalDatos.value;
  verInfo(data);
};
const verInfo = (data) => {
  actividades.id = data.id;
  actividades.id_area_apoyo = data.id_area_apoyo;
  actividades.nombre_evento = data.nombre_actividad;
  actividades.proposito_conferencia = data.proposito;
  actividades.duracion = data.duracion;
  actividades.participantes = data.participantes;
  actividades.lugar_evento = data.lugar_evento;
  actividades.institucion_participante = data.institucion_participante;
  actividades.instructor = data.instructor_participante;
  actividades.impacto = data.impacto;
  actividades.estatus = data.estatus;
  actividades.motivo_rechazo = data.motivo_rechazo;
  actividades.fecha = data.created_at;
  store.listaPersonal(store.personal);
  store.personal = data.id_area_apoyo;
};

const columnasActividades = ref([
  {
    name: "id",
    required: true,
    label: "Número",
    align: "center",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombre_evento",
    required: true,
    label: "Nombre del evento",
    align: "center",
    field: "nombre_actividad",
    sortable: true,
  },

  {
    name: "institucion_participante",
    required: true,
    label: "Institución",
    align: "center",
    field: "institucion_participante",
    sortable: true,
  },
  {
    name: "instructor",
    required: true,
    label: "Instructor",
    align: "center",
    field: "instructor_participante",
    sortable: true,
  },
  {
    name: "ver",
    required: true,
    label: "Ver Detalles",
    align: "center",
    field: "ver",
    sortable: true,
  },

  {
    name: "estatus",
    required: true,
    label: "Estatus",
    align: "center",
    field: "estatus",
    sortable: true,
  },
]);
</script>

<template>
  <div class="q-pa-md">
    <div class="text-h6">Actividades</div>
    <div class="text-right">
      <q-btn label="Agregar actividad" color="red" @click="activarModal()" />
    </div>
    <div class="q-pt-sm">
      <ModalComponents
        :is-modal-of="comportamiento_modal == 0 ? 'Add' : 'edit'"
        v-model="modal"
        texto-secundario=""
        :funcion-realizar="
          comportamiento_modal == 0 ? 'Agregar actividad' : 'Editar actividad'
        "
        @submit="submitFormulario"
        :icon="comportamiento_modal == 0 ? 'add' : 'edit'"
        @actualizar="editarActividad"
      >
        <template #contenido>
          <q-banner
            v-if="quitarBanner == true"
            v-show="quitarBanner"
            class="bg-primary text-white"
          >
            <b>Nota importante:</b> Podrá crear su actividad y editarla, elija
            cuidadosamente, la información que proporciona porque no podrá
            borrar el registro, y será reflejada al responsable de autorizar la
            actividad.
            <template v-slot:action>
              <q-btn @click="quitarBanner = false" flat label="QUITAR" />
            </template>
          </q-banner>

          <br />
          <div class="row q-col-gutter-md">
            <q-select
              :class="clasesInputs"
              outlined
              label="Institución"
              v-model="actividades.institucion_participante"
              :options="instituciones"
              @click="asociarData"
            />
            <q-select
              :class="clasesInputs"
              outlined
              label="Instructor"
              v-model="actividades.instructor"
              :options="datosnuevos"
            />
            <q-input
              :class="clasesInputs"
              outlined
              label="Nombre del Evento"
              v-model="actividades.nombre_evento"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />
            <q-input
              :class="clasesInputs"
              outlined
              label="Proposito"
              v-model="actividades.proposito_conferencia"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />
            <q-input
              :class="clasesInputs"
              outlined
              label="Duración del evento"
              v-model="actividades.duracion"
              type="number"
              suffix="hora(s)"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />
            <q-input
              :class="clasesInputs"
              outlined
              label="Participantes"
              v-model="actividades.participantes"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />
            <q-input
              :class="clasesInputs"
              outlined
              label="Lugar del evento"
              v-model="actividades.lugar_evento"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />

            <q-input
              :class="clasesInputs"
              outlined
              label="Impacto esperado en los alumnos"
              v-model="actividades.impacto"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />
            <q-input
              :class="clasesInputs"
              outlined
              label="Area responsable"
              v-model="actividades.area_responsable"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />
            <q-file
              :class="clasesInputs"
              outlined
              v-model="actividades.foto"
              label="Imagen representativa (opcional)"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <!-- {{ actividades }}
            <br />
            {{ institucion_seleccionada }} -->
          </div>
        </template>
      </ModalComponents>

      <ModalComponents
        is-modal-of="Datos"
        v-model="modalDatos"
        funcion-realizar="Datos de la actividad"
        @submit="aprobarActividad"
        icon="info"
      >
        <template #contenido>
          <div class="row q-col-gutter-x-xs q-col-gutter-y-lg-col-gutter-md">
            <div class="col-6">
              <div class="text-weight-bolder">Nombre de la actividad:</div>
              <div class="text-subtitle">{{ actividades.nombre_evento }}</div>
            </div>
            <div class="col-6">
              <div class="text-weight-bolder">Proposito de la conferencía:</div>
              <div class="text-subtitle">
                {{ actividades.proposito_conferencia }}
              </div>
            </div>
            <div class="col-6">
              <div class="text-weight-bolder">Duración del tema:</div>
              <div class="text-subtitle">{{ actividades.duracion }}</div>
            </div>
            <div class="col-6">
              <div class="text-weight-bolder">Participantes recomendados:</div>
              <div class="text-subtitle">{{ actividades.participantes }}</div>
            </div>
            <div class="col-6">
              <div class="text-weight-bolder">Lugar:</div>
              <div class="text-subtitle">{{ actividades.lugar_evento }}</div>
            </div>
            <div class="col-6">
              <div class="text-weight-bolder">Instituto participante:</div>
              <div class="text-subtitle">
                {{ actividades.institucion_participante }}
              </div>
            </div>
            <div class="col-6">
              <div class="d text-weight-bolder">Instructor(a):</div>
              <div class="text-subtitle">{{ actividades.instructor }}</div>
            </div>
            <div class="col-6">
              <div class="text-weight-bolder">
                Impacto de calidad para los estudiantes:
              </div>
              <div class="text-subtitle">
                {{ actividades.impacto }}
              </div>
            </div>
            <div>
              <br />
              {{ actividades.fecha }}
            </div>
            <q-space />
            <div class="text-right" v-if="actividades.estatus === 'Aceptada'">
              <q-chip>
                <q-avatar color="primary" text-color="white"
                  ><q-icon name="check"></q-icon
                ></q-avatar>
                Aceptada
              </q-chip>
            </div>
            <div v-else-if="actividades.estatus === 'Pendiente'">
              <br />
              <q-chip>
                <q-avatar color="warning" text-color="white"
                  ><q-icon name="schedule"></q-icon
                ></q-avatar>
                Pendiente
              </q-chip>
            </div>
            <div v-else>
              <br />
              <q-chip>
                <q-avatar color="red" text-color="white"
                  ><q-icon name="close"></q-icon
                ></q-avatar>
                Rechazada
              </q-chip>
              <div class="text-h6">Motivo de rechazo 😢</div>
              {{ actividades.motivo_rechazo }}
            </div>
          </div>
        </template>
      </ModalComponents>

      <TableComponent
        title="Actividades"
        :columnas="columnasActividades"
        :datos="datosActividades"
        icon_ver="info"
        @editar="cambioEstadoEditar"
        @ver="mostrarDatosModal"
      />
    </div>
  </div>
</template>
