<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();
const props = defineProps({
  datos: Object || Arrary || String,
  funcionRealizar: {
    type: String,
    default: "Funcion a realizar con el modal, Crear, editar, Eliminar",
  },
  textoSecundario: {
    //instrucción adicional
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "delete",
  },
  isModalOf: {
    type: String,
    default: "Confirmacion", //! se recomienda usar "agregar, editar, eliminar"
  },
});

const emits = defineEmits(["submit", "actualizar"]);

const submit = (evt) => {
  emits("submit", evt);
};

const edit = (evt) => {
  emits("actualizar", evt);
};
</script>
<template>
  <q-dialog :position="$q.platform.is.mobile ? 'top' : 'standard'">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <q-icon :name="props.icon" color="red" size="md" />
        </q-avatar>

        <q-toolbar-title
          ><span class="text-weight-bold">{{ props.funcionRealizar }}</span>
          {{ props.textoSecundario }}
        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-form @submit="submit" class="q-gutter-md">
        <q-card-section>
          <div v-if="props.isModalOf === 'Confirmacion'">
            {{ props.datos }}
          </div>
          <div v-else>
            <slot name="contenido">
              {{ props.datos }}
            </slot>
          </div>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn
            v-if="
              props.isModalOf === 'Confirmacion' ||
              props.isModalOf === 'validar' ||
              props.isModalOf === 'rechazar' ||
              props.isModalOf === 'Add'
            "
            :label="props.isModalOf == 'Confirmacion' ? 'Ok' : 'Guardar'"
            color="primary"
            type="submit"
          />
          <q-btn
            v-if="props.isModalOf === 'edit'"
            label="Actualizar"
            color="primary"
            @click="edit"
          />

          <q-btn
            v-if="props.isModalOf === 'Confirmacion'"
            label="cerrar"
            color="negative"
            v-close-popup
            @click="reset"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
