<template>
  <q-page class="row items-center justify-evenly">
    <div>
      INDEX PAGE - hier moet iets nuttigs komen

      <!--
        TODO: Een nuttige index page.
      -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import FormComponent from 'src/components/FormComponent.vue';
import { computed, ref } from 'vue';
import { BaseServerObject } from 'src/data/Base/BaseObject';

import { getFromServer } from 'src/data/Request';

defineOptions({
  name: 'IndexPage',
});

const props = defineProps({
  collection: String,
});

const classname = ref('customer');

// const formFields = computed(() => {
//   return getFields(classname);
// });

const items = ref<BaseServerObject[]>([]);

//items.value = await getFromServer<BaseServerObject>(classname.value);

const selectedItem = ref<BaseServerObject>();

const selectItem = (item: BaseServerObject) => {
  selectedItem.value = item;
};
</script>
