<script setup>
import { ref } from "vue";

const disable = ref(false);

const emits = defineEmits(["onSubmit", "reset"]); //Envio / reset formulario

const onSubmit = (evt) => {
  emits("onSubmit", evt); //Envia el dato con parametro
  disable.value = true;
};

const reset = (evt) => {
  emits("reset", evt); //envia el reset
};
</script>

<template>
  <div>
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" @reset="reset">
          <slot name="formulario"></slot>
          <div class="row justify-end q-pa-sm q-gutter-sm">
            <q-btn
              type="submit"
              label="OK"
              icon="check"
              color="primary"
              outline
              :disable="disable"
            >
              <q-tooltip class="bg-red" :offset="[10, 10]">
                Solo puedes responder la encuesta una vez :)
              </q-tooltip>
            </q-btn>
            <q-btn @click="reset" icon="refresh" color="negative" outline />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped></style>
