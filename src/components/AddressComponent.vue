<template>
  <div v-if="model" class="row q-col-gutter-md">
    <q-input class="col-8" label="Straat" v-model="model.street" />
    <q-input class="col-2" label="Nr" v-model="model.housenumber" />
    <q-input class="col-2" label="Toev." v-model="model.appendix" />

    <q-input class="col-5" label="Postcode" v-model="model.zipcode" />
    <q-input class="col-7" label="Plaats" v-model="model.city" />
  </div>
</template>

<script setup lang="ts">
import { IMdsAddress } from '../data/MDS/Customer';

const model = defineModel<IMdsAddress>();

// Define props with TypeScript types

// Compute form fields based on the initialData class
</script>
