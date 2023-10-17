<script setup>
import { onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "src/stores/store";
import "animate.css";

const darkMode = ref(false);
const $q = useQuasar();
const store = useStore();

watch(darkMode, (darkMode) => {
  $q.dark.set(darkMode);
  $q.localStorage.set("darkMode", darkMode);
  store.cambiarTema(darkMode);
});

onMounted(() => {
  const darkModeIsActive = $q.localStorage.getItem("darkMode");
  if (darkModeIsActive) {
    darkMode.value = true;
  }
});

const cambioModo = () => {
  darkMode.value = true;
};
const cambioModoClaro = () => {
  darkMode.value = false;
};
</script>

<style scoped>
.inicio {
  animation-delay: 0.5s;
}
</style>

<template>
  <div>
    <q-btn
      v-if="darkMode === true"
      v-model="darkMode"
      class="animate__animated animate__rotateIn"
      flat
      dense
      round
      icon="wb_sunny"
      aria-label="dia"
      @click="cambioModoClaro()"
    />

    <q-btn
      v-else
      v-model="darkMode"
      class="animate__animated animate__rotateIn"
      flat
      dense
      round
      icon="nights_stay"
      aria-label="noche"
      @click="cambioModo()"
    />
  </div>
</template>
