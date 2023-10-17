<script setup>
import { ref, onMounted, watch } from "vue";
import ModalComponents from "./ModalComponents.vue";

import Alerts from "src/utils/Alerts";
const props = defineProps({
  title: String,
  columnas: Array || Object,
  datos: Array || Object,
  selection: {
    type: String,
    default: "none", // !none , single, multiple
  },
  modalValidar: {
    type: Boolean,
    default: false,
  },
  acciones: {
    // poner en true en caso de querer bloquear el eliminar y exportar
    type: Boolean,
    default: true,
  },
  icon_ver: {
    type: String,
    default: "list_alt",
  },
  seleccionados: {
    type: [Array || Object],
    default: [],
  },
});

const emits = defineEmits([
  "editar",
  "delete",
  //!profesores
  "validar",
  "ver",
  "selectData",
  //!actividades
  "validarActividad",
  "rechazarActividad",
]);

const tableRef = ref();
const rows = ref([]);
const filter = ref("");
const loading = ref(false);

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 3,
  rowsNumber: 10,
});

const selected = ref([]);
const modalEliminar = ref(false);

// emulate ajax call
// SELECT * FROM ... WHERE...LIMIT...
function fetchFromServer(startRow, count, filter, sortBy, descending) {
  const data = filter
    ? props.datos.filter((row) => row.nombre.includes(filter))
    : props.datos.slice();

  // handle sortBy
  if (sortBy) {
    const sortFn =
      sortBy === "desc"
        ? descending
          ? (a, b) => (a.nombre > b.nombre ? -1 : a.nombre < b.nombre ? 1 : 0)
          : (a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)
        : descending
        ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
        : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
    data.sort(sortFn);
  }

  return data.slice(startRow, startRow + count);
}

// emulate 'SELECT count(*) FROM ...WHERE...'
function getRowsNumberCount(filter) {
  if (!filter) {
    return props.datos.length;
  }
  let count = 0;
  props.datos.forEach((treat) => {
    if (treat.name.includes(filter)) {
      ++count;
    }
  });
  return count;
}

function onRequest(props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;

  loading.value = true;

  // emulate server

  // update rowsCount with appropriate value
  pagination.value.rowsNumber = getRowsNumberCount(filter);

  // get all rows if "All" (0) is selected
  const fetchCount =
    rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

  // calculate starting row of data
  const startRow = (page - 1) * rowsPerPage;

  // fetch data from "server"
  const returnedData = fetchFromServer(
    startRow,
    fetchCount,
    filter,
    sortBy,
    descending
  );

  // clear out existing data and add new
  rows.value.splice(0, rows.value.length, ...returnedData);

  // don't forget to update local pagination object
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;

  // and turn of loading indicator
  loading.value = false;
}

onMounted(() => {
  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction();
});

function dlbClickTable(_, row, index) {
  emits("editar", row);
  console.log(" desde el componente tabla", row);
}
const eliminar = (evt) => {
  emits("delete", evt), console.log(selected.value);
};

watch(selected, (val) => {
  emits("selectData", val);
});

const verDatos = (evt) => {
  emits("ver", evt);
  console.log("id", evt);
};

const aprobarActividad = (evt) => {
  emits("validarActividad", evt);
  console.log("id", evt);
};
const rechazarActividad = (evt) => {
  emits("rechazarActividad", evt);
  console.log("id", evt);
};
const descargarFicha = (evt) => {
  emits("validarActividad", evt);
  console.log("id", evt);
};
</script>
<template>
  <!-- ? modales de confirmacion de eliminacion -->
  <ModalComponents
    icon="delete"
    v-model="modalEliminar"
    texto-secundario="Eliminando..."
    funcion-realizar="Eliminar"
    :datos="selected"
    @submit="eliminar"
  />

  <div class="q-pt-md">
    <q-table
      flat
      bordered
      ref="tableRef"
      :rows="props.datos"
      :columns="props.columnas"
      :row-key="row"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
      :selection="props.selection"
      v-model:selected="selected"
      wrap-cells
      @row-dblclick="dlbClickTable"
      :title="props.title"
    >
      <!-- * filtro de busqueda -->
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <!-- ? BOTONES DE TABLA PARA ACCIONES! -->
      <template v-if="props.modalValidar" v-slot:body-cell-validar="props">
        <q-td class="q-gutter-xs" :props="props">
          <q-btn
            :props="props"
            icon="add_task"
            outline
            color="primary"
            @click="aprobarActividad(props.row.id)"
          >
            <q-tooltip class="bg-primary" :offset="[10, 10]">
              Aprobar actividad
            </q-tooltip>
          </q-btn>
          <q-btn
            :props="props"
            icon="cancel"
            color="red"
            outline
            @click="rechazarActividad(props.row.id)"
          >
            <q-tooltip class="bg-red" :offset="[10, 10]"> Rechazar </q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <!-- ? BOTON PARA DESCARGA DE FICHA TECNICA -->
      <template v-slot:body-cell-descargar="props">
        <q-td class="" :props="props">
          <q-btn
            :props="props"
            icon="download"
            flat
            round
            color="primary"
            @click="descargarFicha(props.row)"
          >
            <q-tooltip class="bg-red" :offset="[10, 10]">
              Descargar ficha
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-ver="props">
        <q-td class="" :props="props">
          <q-btn
            :icon="icon_ver"
            flat
            round
            color="primary"
            @click="verDatos(props.row)"
          >
          </q-btn>
        </q-td>
      </template>
      <!-- ? ACCIONES PARA TABLAS "ELIMINAR" Y "ASIGNACION DE TUTORES" -->

      <template
        v-if="selected != '' && props.acciones === true"
        v-slot:top-left
      >
        <slot name="before"></slot>
      </template>
      <template v-slot:body-cell-es_tutor="props">
        <q-td :props="props">
          <div>
            <q-badge
              v-if="props.value == 'Si'"
              color="primary"
              :label="props.value"
            />
            <q-badge v-else color="red" :label="props.value" />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-estatus="props">
        <q-td :props="props">
          <div>
            <q-badge
              v-if="props.value == 'Aceptada' || props.value == 'Activo'"
              color="primary"
              :label="props.value"
            />
            <q-badge
              v-else-if="props.value == 'Pendiente'"
              color="warning"
              text-color="dark"
              :label="props.value"
            />
            <q-badge v-else color="red" :label="props.value" />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>

      <template v-slot:no-data>
        <div class="full-width flex flex-center q-gutter-sm">
          <q-img
            width="50px"
            height="50px"
            src="src/assets/img/tabla-vacia2.png"
          />

          <span> No hay datos en la tabla :( </span>
        </div>
      </template>
    </q-table>
  </div>
</template>
