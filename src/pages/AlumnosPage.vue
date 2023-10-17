<script setup>
import { ref, onMounted, reactive } from "vue";
import ModalComponents from "src/components/ModalComponents.vue";
import TableComponent from "src/components/TableComponent.vue";
import { getAllAlumnos, bajaDeAlumno } from "src/api/apiTutorias";
import Alerts from "src/utils/Alerts";

onMounted(async () => {
  await todosLosAlumnos();
});
const ModalBajaAlumno = ref(false);
const listaAlumnos = ref([]);
const estatuss = ref([]);
const infoSeleted = reactive({
  id_alumno: null,
});
const columns = ref([
  {
    name: "matricula",
    required: true,
    label: "Matricula",
    align: "left",
    field: (row) => row.matricula,
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
    name: "sexo",
    required: true,
    label: "Sexo",
    align: "center",
    field: "sexo",
    sortable: true,
  },
  {
    name: "correo",
    required: true,
    label: "Correo",
    align: "center",
    field: "correo",
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
    name: "estatus",
    required: true,
    label: "Estatus",
    align: "center",
    field: "estatus",
    sortable: true,
  },
]);
const todosLosAlumnos = async () => {
  await getAllAlumnos()
    .then((response) => {
      if (response.mensaje === "OK") {
        listaAlumnos.value = response.data;

        listaAlumnos.value.map((x) => {
          x.estatus === 1 ? (x.estatus = "Activo") : (x.estatus = "Inactivo");
        });
      }
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
const seleccionar = (data) => {
  console.log(data[0].id);
  infoSeleted.id_alumno = data[0].id;
  estatuss.value = data[0].estatus;
};
const darBajaAlumno = async () => {
  let id;
  const formData = {
    id: infoSeleted.id_alumno,
  };
  await bajaDeAlumno(formData.id)
    .then((response) => {
      console.log(response);
      Alerts.actualizado();
      todosLosAlumnos();
      ModalBajaAlumno.value = false;
    })
    .catch((err) => {});
  console.log("hola");
};
</script>

<template>
  <q-page class="q-pa-md">
    <div class="text-h6 text-right">Lista de alumnos</div>
    <ModalComponents
      icon="autorenew"
      funcion-realizar="Dar baja alumno"
      :datos="`Esperando confirmacion...`"
      v-model="ModalBajaAlumno"
      @submit="darBajaAlumno"
    />
    <TableComponent
      :columnas="columns"
      :datos="listaAlumnos"
      selection="single"
      :acciones="true"
      title="Alumnos"
      @selectData="seleccionar"
    >
      <template #before>
        <q-btn
          :icon="estatuss == 'Activo' ? 'disabled_by_default' : 'done_outline'"
          :color="estatuss == 'Activo' ? 'red' : 'primary'"
          flat
          round
          @click="ModalBajaAlumno = true"
        >
          <q-tooltip style="font-size: 15px">Dar de baja alumno</q-tooltip>
        </q-btn>
      </template>
    </TableComponent>
  </q-page>
</template>
