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
        ref="tableRef"
        style="height: 80vh"
        :title="props.collection"
        :rows="items"
        :columns="columns"
        row-key="_id"
        v-model:selected="selected"
        v-model:pagination="pagination"
        selection="single"
        :loading="loading"
        virtual-scroll
        @request="onRequest"
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
import { computed, watch, ref, onMounted } from 'vue';
import { BaseServerObject } from 'src/data/Base/BaseObject';
import { getFromServer } from 'src/data/Request';
import { classMap, getColumns } from 'src/data/Base/ClassFactory';
import { QTable } from 'quasar';

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

const tableRef = ref<QTable>();

const items = ref<BaseServerObject[]>([]);
const filter = ref('');
const loading = ref(false);
const pagination = ref({
  sortBy: 'asc',
  descending: false,
  page: 1,
  rowsPerPage: 50,
  rowsNumber: 50,
});

const columns = computed(() => getColumns(props.collection));

function onRequest(requestProps: any) {
  const { page, rowsPerPage, sortBy, descending } = requestProps.pagination;
  const filter = requestProps.filter;
  console.log('onRequest', requestProps);
  loading.value = true;

  //pagination.value.rowsNumber = getRowsNumberCount(filter);

  // get all rows if "All" (0) is selected
  const fetchCount =
    rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

  // calculate starting row of data
  const startRow = (page - 1) * rowsPerPage;

  getFromServer<BaseServerObject>(
    props.collection,
    startRow,
    fetchCount,
    sortBy,
    descending,
    filter
  ).then((_) => {
    // update rowsCount with appropriate value
    console.log(_);
    // clear out existing data and add new
    items.value = _.rows;

    // don't forget to update local pagination object
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
    pagination.value.rowsNumber = _.total_rows;

    // ...and turn of loading indicator
    loading.value = false;
  });
}

const selected = ref<BaseServerObject[]>([]);

watch(props, async (newProps, oldCollection) => {
  tableRef.value?.requestServerInteraction();
});

onMounted(() => {
  console.log('onMounted');
  tableRef.value?.requestServerInteraction();
});
</script>
