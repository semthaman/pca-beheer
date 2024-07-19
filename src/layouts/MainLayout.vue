<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> PCA Beheer </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          HIER Komt een goed navigatie menu te staan met in/uitklappen etc.
        </q-item-label>

        <RouterLink
          v-for="link in RouterLinks"
          :key="link.path"
          :to="link.path"
        >
          <q-item-label>{{ link.name }} </q-item-label>
        </RouterLink>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'MainLayout',
});

const leftDrawerOpen = ref(false);

const RouterLinks = ref([
  { path: '/', name: 'Home' },

  { path: '/list/customer', name: 'Klanten - voorbeeld' },
  { path: '/list/reasoncode', name: 'Redenen - MdsCodeType' },
  { path: '/list/solutioncode', name: 'Oplossingen - MdsCodeType' },

  {
    path: '/list/resource',
    name: 'Uitvoerenden - TODO',
  },
]);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
