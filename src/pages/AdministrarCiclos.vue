<script setup>
import { ref, onMounted } from "vue";
import { obtenerPeriodos, obtenerCiclo } from "../api/apiTutorias";
const periodos = ref(null);
const ciclo = ref(null);
onMounted(async () => {
  await obtenerPeriodos().then((response) => {
    periodos.value = response.data;
  });

  await obtenerCiclo().then((response) => {
    ciclo.value = response.data;
  });
});
</script>
<template>
  <div class="q-pa-md">
    <div class="text-h6">Administracion de ciclos y pediodos</div>
    <q-separator size="10px" color="primary" />
    <br />
    <div class="row">
      <div class="text-h6">Ciclos</div>
      <q-space></q-space>
      <q-btn label="Nuevo Ciclo" color="red" outline />
    </div>
    <div v-for="(cl, i) in ciclo" :key="i">
      <div class="row q-gutter-sm flex flex-center">
        <div class="col-3 text-subtitle2">Nombre periodo</div>
        <div class="col-4 text-subtitle2">Fecha inicio</div>
        <div class="col-4 text-subtitle2">Fecha final</div>
        <div class="col-3 text-subtitle2">{{ cl.nombre_ciclo }}</div>
        <div class="col-3 text-subtitle2">{{ cl.fecha_inicio }}</div>
        <div class="col-3 text-subtitle2">{{ cl.fecha_fin }}</div>
      </div>
    </div>
    <div class="text-h6">Periodos</div>
    <div v-for="(periodo, i) in periodos" :key="i">
      <div class="row q-gutter-sm flex flex-center">
        <div class="col-3 text-subtitle2">Nombre periodo</div>
        <div class="col-4 text-subtitle2">Fecha inicio</div>
        <div class="col-4 text-subtitle2">Fecha final</div>
        <div class="col-3 text-subtitle2">
          PERIODO {{ periodo.nombre_periodo }}
        </div>
        <q-input
          type="date"
          class="col-4"
          v-model="periodo.fecha_inicio"
        ></q-input>
        <q-input
          type="date"
          class="col-4"
          v-model="periodo.fecha_fin"
        ></q-input>
      </div>
    </div>
  </div>
</template>
