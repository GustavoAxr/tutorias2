<template>
  <div class="q-pa-md">
    <div class="text-h6">Accesibilidad</div>


    <q-item>
      <q-item-section>
        <q-item-label>Escala de grises</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-toggle color="blue" v-model="escalaDeGrises" val="battery" />
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item>
      <q-item-section>
        <q-item-label>Cambio de tipografia Dislexia</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-toggle color="blue" v-model="tipografiaDislexica" val="battery" />
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item>
      <q-item-section>
        <q-item-label>Guia de lectura</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-toggle color="blue" v-model="guiaDeLectura" val="battery" />
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item>
      <q-item-section>
        <q-item-label>Cambiar tamaño de letra</q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="q-pa-lg flex flex-center q-gutter-md">
          <q-btn round color="secondary" icon="remove" @click="tamanioLetra--" />
          <q-item-label class="text-subtitle text-center">{{ tamanioLetra }}</q-item-label>
          <q-btn round color="secondary" icon="add" @click="tamanioLetra++" />
        </div>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item>
      <q-item-section>
        <q-item-label>Dictador por voz</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-toggle color="blue" v-model="dicatadoPorVoz" val="battery" />

      </q-item-section>
    </q-item>

  </div>
</template>
<script setup>
import { ref } from "vue";

const escalaDeGrises = ref(false);
const tipografiaDislexica = ref(false)
const guiaDeLectura = ref(false)
const tamanioLetra = ref(12)
const dicatadoPorVoz = ref(false)


</script>
