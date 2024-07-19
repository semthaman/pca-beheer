<template>
  <div>
    Het form geeft alle 'formfields' weer van de geselecteerde regel, elke regel
    erft van BaseObject en heeft zodoende 'fields' die worden gemaakt door de
    @field decorator van een property.
    <form @submit.prevent="handleSubmit">
      <div v-for="field in formFields" :key="field.key">
        <!-- <div v-if="formData.formfields?.includes(field.key)">@@@true</div> -->
        <q-input
          v-if="field.type == 'text'"
          :label="field.label"
          v-model="(model as any)[field.key]"
        />
        <q-input
          v-if="field.type == 'number'"
          :label="field.label"
          type="number"
          v-model="(model as any)[field.key]"
        />
        <q-input
          v-if="field.type == 'email'"
          :label="field.label"
          type="email"
          v-model="(model as any)[field.key]"
        />
        <q-checkbox
          v-if="field.type == 'check'"
          :label="field.label"
          :id="field.key"
          v-model="(model as any)[field.key]"
        />
        <!-- address-component is een speciaal component voor adres, voor makkelijk hergebruik
          dit voorbeeld kan gebruikt worden voor andere gecombineerde velden.
        -->
        <address-component
          v-if="field.type == 'address'"
          v-model="(model as any)[field.key]"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import AddressComponent from './AddressComponent.vue';
import { BaseServerObject, IBaseObjectProps } from '../data/Base/BaseObject';

const model = defineModel<IBaseObjectProps>();

// Define props with TypeScript types

// Compute form fields based on the initialData class
const formFields = computed(() => model.value?.fields);

const handleSubmit = () => {
  console.log('Form submitted:', model.value);
};

defineExpose({});
</script>
