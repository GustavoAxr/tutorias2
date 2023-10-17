<script setup>
import { ref, onMounted, reactive } from "vue";
import TableComponent from "src/components/TableComponent.vue";
import ModalComponents from "src/components/ModalComponents.vue";
import LoadingComponent from "src/components/LoadingComponent.vue";

import {
  getGrupos,
  getMaestros,
  getTutores,
  postAsigTutor,
  getTutoresSeleccionados,
  getRelacionDG,
  postRelacionGD,
  postquitTutor,
  getAlumnoByGrupo,
  deleteRelacionGD,
} from "../api/apiTutorias";
import Alerts from "src/utils/Alerts";

const listaDeMaestros = ref([]);
const listaDetutores = ref([]);
const listaDetutoresSeleccionados = ref([]);
const listaDeGrupos = ref([]);
const listaDeALumnosByGrupo = ref([]);
const listaAsociacionMT = ref([]);
const tab = ref("maestros");
const loading = ref(true);
const modalAsociar = ref(false);
const modalCrearTutor = ref(false);
const modalQuitarTutor = ref(false);
const modalVerAlumnos = ref(false);
const modalQuitarRelacion = ref(false);

const infoSeleted = reactive({
  idTblMaestro: null,
  idTblGrupo: null,
  idTblRelacion: null,
});

const datosDeTutor = reactive({
  nombre: null,
});

onMounted(async () => {
  await obtenerListas();
});

const asignandoTutor = () => {
  modalAsociar.value = !modalAsociar.value;
};

const columns = ref([
  {
    name: "id",
    required: true,
    label: "id",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "center",
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellidos",
    required: true,
    label: "Apellidos",
    align: "center",
    field: "apellidos",
    sortable: true,
  },
  {
    name: "es_tutor",
    required: true,
    label: "Es tutor?",
    align: "center",
    field: "es_tutor",
    sortable: true,
  },
]);
const columnsTutores = ref([
  {
    name: "id",
    required: true,
    label: "id",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "center",
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellidos",
    required: true,
    label: "Apellidos",
    align: "center",
    field: "apellidos",
    sortable: true,
  },
]);

const columnsGrupos = ref([
  {
    name: "id",
    required: true,
    label: "id",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombre_cuatrimestre",
    required: true,
    label: "Cuatrimestre",
    align: "center",
    field: "nombre_cuatrimestre",
    sortable: true,
  },
  {
    name: "nombre_grupo",
    required: true,
    label: "Nombre del grupo",
    align: "center",
    field: "nombre_grupo",
    sortable: true,
  },
]);
const columnsRelacionMT = ref([
  {
    name: "id",
    required: true,
    label: "#",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombre",
    required: true,
    label: "Nombre tutor",
    align: "center",
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellidos",
    required: true,
    label: "Apellidos",
    align: "center",
    field: "apellidos",
    sortable: true,
  },
  {
    name: "nombre_cuatrimestre",
    required: true,
    label: "Cuatrimestre",
    align: "center",
    field: "nombre_cuatrimestre",
    sortable: true,
  },
  {
    name: "nombre_grupo",
    required: true,
    label: "Grupo",
    align: "center",
    field: "nombre_grupo",
    sortable: true,
  },
  {
    name: "ver",
    required: true,
    label: "Ver alumnos",
    align: "center",
    field: "ver",
    sortable: true,
  },
]);

const obtenerListas = async () => {
  //*  obtiene lista de maestros
  await getMaestros().then((res) => {
    listaDeMaestros.value = res.data;
    listaDeMaestros.value.map((x) => {
      x.es_tutor === 0 ? (x.es_tutor = "No") : (x.es_tutor = "Si");
    });
  });
  // tutores CUANDO "SELECCIONADO" ESTA EN 1
  await getTutores().then((res) => {
    listaDetutores.value = res.data;
  });
  //  tutores seleccionados con grupos
  await getTutoresSeleccionados().then((res) => {
    listaDetutoresSeleccionados.value = res.data;
  });
  // lista de grupos
  await getGrupos().then((res) => {
    listaDeGrupos.value = res.data;
  });
  //   relacion de tutores-grupos
  await getRelacionDG().then((res) => {
    listaAsociacionMT.value = res.data;
  });
};

Promise.all([obtenerListas()])
  .catch((e) => {
    console.log("error", e);
    loading.value = false;
  })
  .finally(() => {
    loading.value = false;
  });
const abrirmodalConDatos = async (evt) => {
  loading.value = true;
  modalVerAlumnos.value = !modalVerAlumnos.value;
  console.log(evt, "id pfoe");
  infoSeleted.idTblGrupo = evt.id_grupo;
  if (evt) {
    await getAlumnoByGrupo(infoSeleted.idTblGrupo)
      .then((res) => {
        listaDeALumnosByGrupo.value = res.data;
        listaDeALumnosByGrupo.value.map((datos) => {
          datos.nombre;
          datos.pellidos;
          datos.correo;
          datos.matricula;
        });
        console.log(listaDeALumnosByGrupo.value);
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
//---------------------------------
//? SELECTED QUE RECIBEN LOS CHECKS DE LAS TABLAS

// tabla 1 maestros
const AsignacionDetutor = (data) => {
  console.log(data[0]);
  infoSeleted.idTblMaestro = data[0].id;
  datosDeTutor.nombre = data[0].nombre + " " + data[0].apellidos;
};
// tabla 2 tutores
const selectedtutor = (data) => {
  console.log(data[0].id);
  infoSeleted.idTblMaestro = data[0].id;
};
// tabla 3 grupos
const selectedGrupo = (data) => {
  console.log(data[0].id);
  infoSeleted.idTblGrupo = data[0].id;
};
// tabla 3 grupos
const deleteAsociacionTutorGrupo = (data) => {
  console.log(data[0].id);
  infoSeleted.idTblRelacion = data[0].id;
  console.log(infoSeleted.idTblRelacion);
};
//-------------------------------------

const agregarRelacionGD = async () => {
  let formData = {
    id_docente: infoSeleted.idTblMaestro,
    id_grupo: infoSeleted.idTblGrupo,
  };
  loading.value = true;
  await postRelacionGD(formData)
    .then((response) => {
      if (response.mensaje === "OK") {
        obtenerListas();
        loading.value = true;
        asignandoTutor();
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (loading.value = false));
};

const asignartutor = async () => {
  let formData = {
    id: infoSeleted.idTblMaestro,
  };
  loading.value = true;
  await postAsigTutor(formData)
    .then((response) => {
      if (response.mensaje == "EXISTENTE") {
        Alerts.duplicados();
        modalCrearTutor.value = false;
      } else {
        obtenerListas();
        Alerts.actualizado();
        modalCrearTutor.value = false;
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (loading.value = false));
};
const quitarTutor = async () => {
  let formData = {
    id: infoSeleted.idTblMaestro,
  };
  loading.value = true;
  await postquitTutor(formData)
    .then((response) => {
      if (response.mensaje == "EXISTENTE") {
        Alerts.noTutor();
        modalQuitarTutor.value = false;
      } else if (response.mensaje == "SELECCIONADO") {
        Alerts.tutorRelacionado();
      } else {
        obtenerListas();
        Alerts.actualizado();
        modalQuitarTutor.value = false;
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (loading.value = false));
};

const quitarRelacion = async () => {
  let formData = {
    id: infoSeleted.idTblRelacion,
  };
  loading.value = true;
  await deleteRelacionGD(formData.id)
    .then((response) => {
      console.log(response);
      if (response.mensaje === "OK") {
        modalQuitarRelacion.value = false;
        obtenerListas();
        Alerts.actualizado();
      }
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => (loading.value = false));
};
</script>

<style lang="scss" scoped></style>

<template>
  <q-page class="q-pa-md">
    <div class="text-h6 text-right">Selección de tutores</div>
    <ModalComponents
      funcion-realizar="Asociacion de tutores a grupos"
      :datos="'¿Desea asociar este tutor con este grupo?'"
      v-model="modalAsociar"
      @submit="agregarRelacionGD"
    />

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="maestros" label="Lista de maestros" />
      <q-tab name="tutores" label="Asignacion de tutores" />
      <q-tab name="listas_finales" label="Listas finales" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="maestros">
        <ModalComponents
          icon="check_circle"
          funcion-realizar="Crear tutor"
          :datos="datosDeTutor.nombre"
          v-model="modalCrearTutor"
          @submit="asignartutor"
        />
        <ModalComponents
          icon="autorenew"
          funcion-realizar="Quitar rol de tutor"
          :datos="`¿Desea quitar a ${datosDeTutor.nombre}`"
          v-model="modalQuitarTutor"
          @submit="quitarTutor"
        />
        <div class="text-h6">
          Seleccione los docentes que llevaran el cargo de tutor
        </div>
        <TableComponent
          :datos="listaDeMaestros"
          :columnas="columns"
          selection="single"
          title="Maestros"
          @selectData="AsignacionDetutor"
        >
          <template #before>
            <q-btn
              icon="delete"
              color="red"
              flat
              round
              @click="modalQuitarTutor = true"
            >
              <q-tooltip>Eliminar rol de tutor</q-tooltip>
            </q-btn>
            <q-btn
              icon="checklist_rtl"
              color="primary"
              flat
              round
              @click="modalCrearTutor = true"
            >
              <q-tooltip style="font-size: 15px"
                >Asignar como tutores</q-tooltip
              >
            </q-btn>
          </template>
        </TableComponent>
      </q-tab-panel>

      <q-tab-panel name="tutores">
        <div class="text-h6">Seleccion de grupos</div>
        <br />
        <q-btn
          label="Asociar tutor"
          class="full-width"
          color="primary"
          @click="asignandoTutor"
        />
        <div class="row q-col-gutter-md">
          <div class="col-md-7 col-sm-12">
            <TableComponent
              title="Tutores"
              :datos="listaDetutores"
              :columnas="columnsTutores"
              selection="single"
              :acciones="false"
              @selectData="selectedtutor"
            />
          </div>
          <div class="col-md-5 col-sm-12">
            <TableComponent
              title="Grupos"
              :datos="listaDeGrupos"
              :columnas="columnsGrupos"
              selection="single"
              :acciones="false"
              @selectData="selectedGrupo"
            />
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="listas_finales">
        <div class="text-h6">Grupos con su tutor asignado</div>
        <ModalComponents
          icon="view_list"
          funcion-realizar="Lista de alumnos"
          :datos="listaDeALumnosByGrupo"
          v-model="modalVerAlumnos"
          is-modal-of="ListaAlumnos"
        >
          <template #contenido>
            <div v-if="listaDeALumnosByGrupo[0]">
              <q-markup-table
                wrap-cells
                dense
                separator="none"
                bordered="false"
              >
                <thead>
                  <tr>
                    <th class="text-center">#</th>
                    <th class="text-center">Matricula</th>
                    <th class="text-center">Nombres</th>
                    <th class="text-center">Apellidos</th>
                    <th class="text-center">Correo</th>
                    <!-- <th class="text-center">Estatus</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(lista, index) in listaDeALumnosByGrupo"
                    :key="lista.id"
                  >
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-center">{{ lista.matricula }}</td>
                    <td class="text-center">{{ lista.nombre }}</td>
                    <td class="text-center">{{ lista.apellidos }}</td>
                    <td class="text-center">{{ lista.correo }}</td>
                    <!-- <td class="text-center">{{ lista.estatus }}</td> -->
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
            <div v-else>
              <div class="flex flex-center">
                <q-img
                  width="100px"
                  height="100px"
                  src="src/assets/img/tabla-vacia2.png"
                />
              </div>
            </div>
          </template>
        </ModalComponents>
        <ModalComponents
          icon="autorenew"
          funcion-realizar="Eliminar relacion"
          datos="¿Desea realmente deshacer esta asociación?"
          v-model="modalQuitarRelacion"
          @submit="quitarRelacion"
        />
        <TableComponent
          :datos="listaAsociacionMT"
          :columnas="columnsRelacionMT"
          selection="single"
          :acciones="true"
          @ver="abrirmodalConDatos"
          @selectData="deleteAsociacionTutorGrupo"
        >
          <template #before>
            <q-btn
              icon="cloud_sync"
              color="primary"
              flat
              round
              @click="modalQuitarRelacion = true"
            >
              <q-tooltip style="font-size: 15px">Disolver relación</q-tooltip>
            </q-btn>
          </template>
        </TableComponent>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
  <LoadingComponent :showing="loading" msg="Cargado Datos" />
</template>
