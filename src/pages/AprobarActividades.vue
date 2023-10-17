<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { Notify, Platform } from "quasar";
import TableComponent from "src/components/TableComponent.vue";
import Alerts from "src/utils/Alerts";
import ModalComponents from "src/components/ModalComponents.vue";
import GenerarPlaneacion from "./GenerarPlaneacion.vue";
import {
  obtenerActividadesPendientes,
  aprobarActividad,
  denegarActividad,
  obtenerActividadesAceptadas,
  obtenerActividadesRechazadas,
} from "../api/apiTutorias";

const tab = ref("aprobar");
const modalDatos = ref(false);
const modalValidar = ref(false);
const modalrechazar = ref(false);
const modalEliminar = ref(false);
const pendientePorAprobar = ref([]);
const actividadesAceptadas = ref([]);
const actividadesRechazadas = ref([]);
const isMobile = Platform.is.mobile;
const date = ref(null);
const time = ref(null);
const id = ref(0);

const _actividades = {
  id: null,
  id_area_apoyo: null,
  nombre_evento: null,
  proposito_conferencia: null,
  duracion: null,
  participantes: null,
  lugar_evento: null,
  institucion_participante: null,
  foto: "https://asepyme.com/wp-content/uploads/2017/07/como-constituir-una-fundacion.jpg",
  instructor: null,
  impacto: null,
  area_responsable: null,
  estatus: null,
  motivo_rechazo: null,
  fecha: null,
  creador: null,
};

const actividades = reactive({ ..._actividades });

function optionsFn2(date) {
  const parts = date.split("/");
  return parts[2] % 1 === 0;
}
onMounted(async () => {
  await obtenerActividadesPorAprobar();
  await obtenerActividadesAprobadas();
  await obtenerActividadesDenegadas();
});

const obtenerActividadesPorAprobar = async () => {
  await obtenerActividadesPendientes().then((response) => {
    pendientePorAprobar.value = response.data;
  });
};
const obtenerActividadesAprobadas = async () => {
  await obtenerActividadesAceptadas().then((response) => {
    actividadesAceptadas.value = response.data;
    console.log(response);
  });
};
const obtenerActividadesDenegadas = async () => {
  await obtenerActividadesRechazadas().then((response) => {
    actividadesRechazadas.value = response.data;
    console.log(actividadesRechazadas.value);
  });
};

const columnas = ref([
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
    name: "nombre_usuario",
    required: true,
    label: "Enviado por.",
    align: "center",
    field: "nombre_usuario",
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
    name: "validar",
    required: true,
    label: "Validar",
    align: "center",
    field: "validar",
    sortable: true,
  },
]);

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
  actividades.creador = data.nombre_usuario;
};

const mostrarDatosModal = (data) => {
  modalDatos.value = !modalDatos.value;
  verInfo(data);
};

const confirmarValidacion = (data) => {
  modalValidar.value = !modalValidar.value;
  id.value = data;
};
const validar = async () => {
  let formData = {
    id: id.value,
    fecha_asignada: date.value,
    hora_asignada: time.value,
  };
  await aprobarActividad(formData).then((response) => {
    if (response.mensaje === "OK") {
      Alerts.actividadAceptada();
      confirmarValidacion();
      obtenerActividadesPorAprobar();
    }
  });
};

const rechazarActividad = (data) => {
  modalrechazar.value = !modalrechazar.value;
  id.value = data;
};
const rechazarValidacion = async () => {
  let formData = {
    id: id.value,
    motivo_rechazo: actividades.motivo_rechazo,
  };
  await denegarActividad(formData).then((response) => {
    if (response.mensaje === "OK") {
      Alerts.actividadRechazada();
      rechazarActividad();
      obtenerActividadesPorAprobar();
    }
  });
};
</script>

<template>
  <div class="q-pa-md">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="aprobar" label="Aprobación de actividades" />
      <q-tab name="generar" label="Planeación de actividades" />
      <q-tab name="rechazada" label="Actividades rechazadas" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="aprobar">
        <div class="q-pt-sm">
          <div class="text-h6">Actividades pendientes por aprobar</div>
          <!-- * MODAL PARA VALIDAR LA ACTIVIDAD! -->
          <ModalComponents
            icon="check"
            v-model="modalValidar"
            @submit="validar"
            is-modal-of="validar"
            funcion-realizar="Validar"
          >
            <template #contenido>
              <div class="q-pa-sm">
                <div>Seleccione la fecha y la hora del evento</div>
                <q-input filled v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="date"
                          :options="optionsFn2"
                          years-in-month-view
                          today-btn
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input filled v-model="time" mask="time" :rules="['time']">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="time">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </template>
          </ModalComponents>
          <!-- ? MODAL PARA RECHAZAR LA ACTIVIDAD! -->
          <ModalComponents
            icon="close"
            v-model="modalrechazar"
            @submit="rechazarValidacion"
            is-modal-of="rechazar"
            funcion-realizar="Rechazar"
          >
            <template #contenido>
              <q-input
                type="textarea"
                label="Motivo de rechazo"
                v-model="actividades.motivo_rechazo"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
              />
            </template>
          </ModalComponents>
          <ModalComponents
            is-modal-of="Datos"
            v-model="modalDatos"
            funcion-realizar="Datos de la actividad"
            icon="info"
          >
            <template #contenido>
              <div
                class="row q-col-gutter-x-xs q-col-gutter-y-lg-col-gutter-md"
              >
                <div class="col-12">
                  <div class="text-weight-bolder">Actividad agregada por</div>
                  <div class="text-subtitle">
                    {{ actividades.creador }}
                  </div>
                </div>
                <div class="col-12">
                  <q-img
                    width="100%"
                    height="200px"
                    :src="actividades.foto"
                    class="text-subtitle"
                  >
                  </q-img>
                </div>
                <div class="col-6">
                  <div class="text-weight-bolder">Nombre de la actividad:</div>
                  <div class="text-subtitle">
                    {{ actividades.nombre_evento }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-weight-bolder">
                    Proposito de la conferencía:
                  </div>
                  <div class="text-subtitle">
                    {{ actividades.proposito_conferencia }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-weight-bolder">Duración del tema:</div>
                  <div class="text-subtitle">{{ actividades.duracion }}</div>
                </div>
                <div class="col-6">
                  <div class="text-weight-bolder">
                    Participantes recomendados:
                  </div>
                  <div class="text-subtitle">
                    {{ actividades.participantes }}
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-weight-bolder">Lugar:</div>
                  <div class="text-subtitle">
                    {{ actividades.lugar_evento }}
                  </div>
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
                <div
                  class="text-right"
                  v-if="actividades.estatus === 'Aceptada'"
                >
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
            :grid="$q.screen.md"
            :columnas="columnas"
            :datos="pendientePorAprobar"
            selection="none"
            :tabla-validar="true"
            @editar="dobleClick"
            :modal-validar="true"
            icon_ver="info"
            @validarActividad="confirmarValidacion"
            @rechazarActividad="rechazarActividad"
            @ver="mostrarDatosModal"
          />
        </div>
      </q-tab-panel>
      <q-tab-panel class="q-pa-none" name="generar">
        <div v-if="isMobile">
          <q-list>
            <q-item
              v-for="(aceptadas, index) in actividadesAceptadas"
              :key="index"
            >
              <q-item-section>
                <q-item-label>{{ aceptadas.nombre_actividad }}</q-item-label>
                <q-item-label caption lines="2">{{
                  aceptadas.proposito
                }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>{{
                  aceptadas.institucion_participante
                }}</q-item-label>
                <q-btn icon="download" color="red" flat />
              </q-item-section>
            </q-item>
            <q-separator spaced inset />
          </q-list>
        </div>
        <div v-else>
          <GenerarPlaneacion
            :columnas="columnas"
            :datosTabla="actividadesAceptadas"
          />
        </div>
      </q-tab-panel>
      <q-tab-panel class="q-pa-none" name="rechazada">
        <TableComponent
          :grid="$q.screen.md"
          :columnas="columnas"
          :datos="actividadesRechazadas"
          selection="none"
          :tabla-validar="true"
          @editar="dobleClick"
          :modal-validar="true"
          icon_ver="info"
          @validarActividad="confirmarValidacion"
          @rechazarActividad="rechazarActividad"
          @ver="mostrarDatosModal"
      /></q-tab-panel>
    </q-tab-panels>
  </div>
</template>
