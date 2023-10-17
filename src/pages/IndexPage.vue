<script setup>
import { ref } from "vue";
import CardInformation from "src/components/CardInformation.vue";
</script>

<template>
  <q-page class="q-pa-md">
    <div class="q-pb-md text-h6">Proximo evento</div>
    <CardInformation />
    <br />
    <div class="q-pb-md text-h6">Actividades completadas</div>
    <CardInformation />
  </q-page>
</template>

<style></style>
