<template>
  <q-page class="row justify-evenly" style="height: 100%">
    <div :class="listClass">
      <div class="q-pa-md">
        Q-Table - weergave van {{ props.collection }} van de server, kolommen
        komen uit de static functie getColumns. die geeft een lijst van
        QTableColumn objecten. <br /><br />iets met een werkende paginering zou
        mooi zijn.
      </div>
      <q-table
        style="height: 100%"
        :title="props.collection"
        :rows="items"
        :columns="columns"
        row-key="_id"
        v-model:selected="selected"
        selection="single"
      />
      <!--
        TODO: IPV q-table, wellicht q-table in een custom component?
        voor betere scheiding functionaliteit.
      -->
    </div>
    <div :class="formClass" class="q-pa-md" v-if="selected.length > 0">
      <FormComponent v-model="selected[0]" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import FormComponent from 'src/components/FormComponent.vue';
import { computed, watch, ref } from 'vue';
import { BaseServerObject } from 'src/data/Base/BaseObject';
import { getFromServer } from 'src/data/Request';
import { classMap, getColumns } from 'src/data/Base/ClassFactory';

defineOptions({
  name: 'IndexPage',
});

interface ListProps {
  collection: string;
}

const props = withDefaults(defineProps<ListProps>(), {
  collection: '',
});

const listClass = computed(() => {
  return selected.value.length > 0 ? 'col-8' : 'col-12';
});
const formClass = computed(() => {
  return selected.value.length > 0 ? 'col-4' : 'col-0';
});

const items = ref<BaseServerObject[]>([]);

const columns = computed(() => getColumns(props.collection));

const selected = ref<BaseServerObject[]>([]);
getFromServer<BaseServerObject>(props.collection).then((_) => {
  items.value = _;
});

watch(props, async (newProps, oldCollection) => {
  getFromServer<BaseServerObject>(newProps.collection).then((_) => {
    items.value = _;
  });
});
</script>
