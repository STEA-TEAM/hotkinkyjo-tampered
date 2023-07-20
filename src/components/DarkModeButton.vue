<script lang="ts" setup>
import { useSettingsStore } from 'stores/settings';
import { storeToRefs } from 'pinia';

const { toggleDarkMode } = useSettingsStore();
const { darkModeColorAndIcon } = storeToRefs(useSettingsStore());
</script>

<template>
  <q-btn
    :icon="darkModeColorAndIcon.icon"
    :text-color="darkModeColorAndIcon.color"
    flat
    round
    @click="toggleDarkMode"
  >
    <q-tooltip
      anchor="center right"
      self="center left"
      transition-hide="jump-left"
      transition-show="jump-right"
    >
      Toggle dark mode
    </q-tooltip>
  </q-btn>
</template>

<style scoped></style>
