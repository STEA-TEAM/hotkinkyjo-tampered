<script lang="ts" setup></script>
<template>
  <q-layout view="hHh Lpr lFf">
    <router-view name="header" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <router-view name="footer" />
  </q-layout>
</template>
