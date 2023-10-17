<script setup>
import { ref, reactive, watch, onMounted, computed } from "vue";
import { useStore } from "src/stores/store";
import TableComponent from "src/components/TableComponent.vue";
import ModalComponents from "src/components/ModalComponents.vue";
import {
  getAreasApoyo,
  agregarAreaApoyo,
  deleteArea,
} from "../api/apiTutorias";
import { stringToArray } from "src/components/StringToArray";
import Alerts from "src/utils/Alerts";
import { updateArea } from "../api/apiTutorias";

const store = useStore();
const modal = ref(false);
const datosAreas = ref([]);
const estado = ref("add");
const modalEliminar = ref(false);

onMounted(async () => {
  await obtenerAreasDeApoyo();
});

const activarModal = () => {
  modal.value = !modal.value;
};

//! 1
const input = ref([
  {
    label: "Nombre Asignado",
    value: null,
  },
]);
//! 2
function agregar() {
  input.value.push({
    label: "Nombre Asignado",
    value: null,
  });
}
//! 3
const soloNombres = computed(() => {
  let nombres = [];

  input.value.forEach((element) => {
    nombres.push(element.value);
  });

  return nombres.join(", ");
});

const _areaApoyo = reactive({
  id: null,
  nombre_area: null,
});
const areaApoyo = reactive({ ..._areaApoyo });

const obtenerAreasDeApoyo = async () => {
  await getAreasApoyo()
    .then((response) => {
      datosAreas.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const submitFormulario = async () => {
  let formData = {
    nombre_area: areaApoyo.nombre_area,
    personal_asignado: soloNombres.value,
  };
  await agregarAreaApoyo(formData)
    .then((response) => {
      if (response.mensaje === "OK") {
        Alerts.agregado();
        activarModal();
        obtenerAreasDeApoyo();
      }
    })
    .catch((error) => {
      console.log(error);
      Alerts.error();
    });
};
//? 1

function eliminarInput(i) {
  input.value.splice(i, 1);
}

const dobleClick = async (rellenar) => {
  estado.value = "editar";
  activarModal();
  areaApoyo.id = rellenar.id;
  areaApoyo.nombre_area = rellenar.nombre_area;
  const arrayData = stringToArray(rellenar.personal_asignado);
  let _inputs = [];
  arrayData.forEach((item) => {
    _inputs.push({
      label: "Nombre Asignado",
      value: item,
    });
  });
  input.value = _inputs;
};

const actualizarArea = async () => {
  const formData = {
    id: areaApoyo.id,
    nombre_area: areaApoyo.nombre_area,
    personal_asignado: soloNombres.value,
  };
  console.log("fomdata", formData);
  await updateArea(formData)
    .then((response) => {
      console.log(response);
      Alerts.actualizado();
      obtenerAreasDeApoyo();
      activarModal();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
};

const selectedId = (data) => {
  console.log(data[0].id);
  areaApoyo.id = data[0].id;
};

const eliminar = async () => {
  let id = areaApoyo.id;
  console.log(id);
  await deleteArea(id)
    .then((response) => {
      if (response.mensaje === "OK") {
        Alerts.eliminado();
        modalEliminar.value = false;
        obtenerAreasDeApoyo();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const columnasApoyo = ref([
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
    name: "nombre_area",
    required: true,
    label: "Institucion",
    align: "center",
    field: "nombre_area",
    sortable: true,
  },
  {
    name: "personal_asignado",
    required: true,
    label: "Personal",
    align: "center",
    field: "personal_asignado",
    sortable: true,
  },
]);
</script>

<template>
  <div class="q-pa-md">
    <div class="text-h6">Areas de apoyo</div>
    <div class="text-right">
      <q-btn label="Agregar área" color="red" @click="activarModal" />
    </div>
    <div class="q-pt-sm">
      <ModalComponents
        is-modal-of="Confirmacion"
        v-model="modalEliminar"
        funcion-realizar="Eliminar área de apoyo"
        icon="delete"
        :datos="areaApoyo.id"
        @submit="eliminar"
      />
      <ModalComponents
        :is-modal-of="estado == 'add' ? 'Add' : 'edit'"
        v-model="modal"
        funcion-realizar="Agregar área de apoyo"
        icon="add"
        @submit="submitFormulario"
        @actualizar="actualizarArea"
      >
        <template #contenido>
          <div class="q-col-gutter-md">
            <q-input
              outlined
              label="Institución"
              v-model="areaApoyo.nombre_area"
            />
            <div v-for="(item, i) in input" :key="i">
              <q-input
                outlined
                v-model="item.value"
                type="text"
                :label="item.label"
              >
                <template v-slot:after>
                  <q-btn
                    v-if="i >= 1"
                    round
                    dense
                    flat
                    icon="close"
                    @click="eliminarInput(i)"
                  />
                </template>
              </q-input>
            </div>
            <div class="q-pt-none">
              <q-btn
                size="10px"
                class="q-pa-none"
                color="primary"
                flat
                label="Agregar asignado"
                @click="agregar()"
              />
            </div>
          </div>
        </template>
      </ModalComponents>

      <TableComponent
        :columnas="columnasApoyo"
        :datos="datosAreas"
        selection="single"
        @actualizar="actualizarArea"
        @editar="dobleClick"
        @selectData="selectedId"
      >
        <template #before>
          <q-btn
            icon="delete"
            color="red"
            flat
            round
            @click="modalEliminar = true"
          />
        </template>
      </TableComponent>
    </div>
  </div>
</template>
