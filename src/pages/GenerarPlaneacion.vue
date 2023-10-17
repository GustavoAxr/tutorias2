<script setup>
import { ref } from "vue";
import TableComponent from "src/components/TableComponent.vue";
import LoadingComponent from "src/components/LoadingComponent.vue";
import { generarPlaneacion, generarFichaEvento } from "../api/apiTutorias";

const loading = ref(false);

const props = defineProps({
  datosTabla: [],
  columnas: [],
  verDetalles: Function,
});

const descargarFicha = async (item) => {
  console.log("item", item);
  const config = {
    onDownloadProgress: (progressEvent) => {
      console.log(progressEvent);
    },
    responseType: "blob",
  };
  let formData = {
    id: item.id,
  };
  loading.value = true;
  await generarFichaEvento(formData, config)
    .then((response) => {
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.click();

      // } else {
      //   const url = window.URL.createObjectURL(
      //     new Blob([response], {
      //       type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      //     })
      //   );
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.download = "archivo.docx"; // Nombre del archivo a descargar
      //   link.click();
      // }
    })
    .catch((e) => {
      loading.value = true;

      console.log(e);
    })
    .finally(() => {
      loading.value = false;
    });
};

const generarPlaneacionActividades = async () => {
  const config = {
    onDownloadProgress: (progressEvent) => {
      console.log(progressEvent);
    },
    responseType: "blob",
  };
  let formData = {
    id: item.id,
  };
  loading.value = true;
  await generarPlaneacion(formData, config)
    .then((response) => {
      const url = window.URL.createObjectURL(
        new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "archivo.docx"; // Nombre del archivo a descargar
      link.click();
    })
    .catch((e) => {
      loading.value = true;

      console.log(e);
    })
    .finally(() => {
      loading.value = false;
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
    name: "descargar",
    required: true,
    label: "Descargar ficha",
    align: "center",
    field: "descargar",
    sortable: true,
  },
]);
</script>
<template>
  <div class="q-pa-md">
    <div class="text-h6">Planeación de actividades</div>
    <div class="text-right">
      <q-btn
        color="red"
        glossy
        unelevated
        icon="cloud_download"
        @click="generarPlaneacionActividades"
        label="Generar planeación"
      />
    </div>
    <TableComponent
      :grid="$q.screen.xs"
      :columnas="columnas"
      :datos="props.datosTabla"
      selection="none"
      :tabla-validar="true"
      @editar="dobleClick"
      @validarActividad="descargarFicha"
    />
  </div>
  <LoadingComponent :showing="loading" msg="Cargado Datos" />
</template>
