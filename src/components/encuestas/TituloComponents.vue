<script setup>
const props = defineProps({
  tipo: {
    type: String,
    default: "titulo", //Tipo de texto //  subtitulo o cualquier otro nombre, aplica el h6
  },
  titulo: String, //Texto deseado
});
</script>
<template>
  <div class="text-center">
    <div :class="props.tipo == 'titulo' ? 'text-h5 text-right' : 'text-h6'">
      <b> {{ props.titulo }}</b>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
