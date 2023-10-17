<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  items: Array,
  titulo: String,
  selected: Object,
});

const emits = defineEmits(["valor"]);
const filterArticulos = ref(props.items);
const selectedItem = ref(null);

onMounted(() => {
  selectedItem.value = props.selected;
});

function filterFn(val, update) {
  update(() => {
    if (val === "") {
      filterArticulos.value = props.items;
    } else {
      const needle = val.toLowerCase();
      filterArticulos.value = props.items.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
}

watch(
  () => selectedItem.value,
  (val) => {
    if (selectedItem.value) {
      emits("valor", val);
    }
  }
);
</script>

<template>
  <q-select
    dense
    use-input
    outlined
    fill-input
    hide-selected
    v-model="selectedItem"
    :label="props.titulo"
    :options="filterArticulos"
    @filter="filterFn"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No hay datos </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
