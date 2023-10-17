<script setup>
import { ref } from "vue";

const props = defineProps({
  labelBtn: String,
  iconBtn: String,
  qTooltip: String,
  colorTooltip: String,
  onTooltip: {
    type: Boolean,
    default: true,
  },

  header: {
    type: String,
    default: "Titulo de la carta",
    required: true,
  },
  isImage: {
    type: Boolean,
    default: false,
  },
  contenido: {
    type: [String, Object, Function, Number, Array, File, FileList],
  },
  actionsBtns: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: "500px",
  },
  width: {
    type: String,
    default: "500px",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["onDialog"]);
function onDialog(evt) {
  modal.value = !modal.value;
  emits("onDialog", evt);
  console.log(evt);
}
const modal = ref(false);
</script>

<template>
  <q-btn
    :label="props.labelBtn"
    @click="onDialog"
    :icon="props.iconBtn"
    flat
    round
  >
    <q-tooltip
      v-if="onTooltip"
      anchor="top left"
      self="center left"
      :class="props.colorTooltip"
      :offset="[10, 10]"
    >
      <strong>{{ props.qTooltip }}</strong>
    </q-tooltip>
  </q-btn>
  <q-dialog
    v-model="modal"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card :style="`width: ${props.width}; height: ${props.height}`">
      <q-card-section>
        <div class="text-h6">{{ props.header }}</div>
      </q-card-section>
      <q-card-section v-if="props.isImage == true" class="q-pt-none">
        <img :src="props.contenido" :alt="props.contenido" />
      </q-card-section>
      <q-card-section v-else class="q-pt-none">
        {{ props.contenido }}
      </q-card-section>
      <q-card-actions v-if="props.actionsBtns" align="right">
        <q-btn
          flat
          label="Cerrar"
          color="primary"
          v-close-popup
          @click="onDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style></style>
