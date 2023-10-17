<script setup>
import { onMounted, reactive } from "vue";
const props = defineProps({
  showing: {
    type: Boolean,
    default: false,
  },
  msg: {
    type: String,
    default: "Cargando ...",
  },
});

onMounted(async () => {
  console.log("loading");
});
</script>

<template>
  <q-inner-loading :showing="props.showing" transition-duration="500">
    <q-spinner-hourglass size="5em" color="primary" />
    <p>{{ props.msg }}</p>
  </q-inner-loading>
</template>
