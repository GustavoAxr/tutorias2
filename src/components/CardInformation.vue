<script setup>
const props = defineProps({
  titulo: {
    type: [String, Array, Object],
    default:
      "EVENTO: DIA INTERNACIONAL DE LA MUJER DATO POR LA LIC. ARACELI ABREU RAMIREZ",
  },
  cuerpo: {
    type: [String, Array, Object],
    default:
      "Aqui ira el contenido de las siguientes actividades segun el plan de tutorias",
  },
  imagen: {
    type: [String],
    default: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
  datos: Object || Array || String,
});
function evento() {
  //evento al dar clic
  console.log("evento");
}
</script>

<template>
  <q-card @click="evento" style="min-height: 200px" flat class="hover">
    <q-card-section horizontal>
      <q-card-section class="col-8">
        <div class="text-h6">{{ props.titulo }}</div>
        {{ props.cuerpo }}
      </q-card-section>
      <q-img class="col-4" :src="props.imagen" style="height: 200px" />
    </q-card-section>
  </q-card>
</template>

<style>
.hover :hover {
  color: rgb(46, 186, 36);
  /* background-color: rgb(237, 238, 240); */
  cursor: pointer;
  transition: 300ms;
  transform: translateX(1%);
  box-shadow: 2px, 2px, 430px, -10px #202020;
}
</style>
