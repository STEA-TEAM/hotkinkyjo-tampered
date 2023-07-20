<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';

import DownloadDialog from 'components/DownloadDialog.vue';
import { getElement } from 'utils/dom';

const { dialog } = useQuasar();

const downloading = ref(false);
const videoLink = ref<string>();

const startDownload = async () => {
  if (!videoLink.value) {
    return;
  }
  downloading.value = true;
  dialog({
    component: DownloadDialog,
    componentProps: {
      videoLink: videoLink.value,
    },
  }).onDismiss(() => {
    downloading.value = false;
  });
};

onMounted(async () => {
  const videoElement = <HTMLVideoElement>await getElement('video');
  if (videoElement) {
    videoLink.value = videoElement.src;
  }
});
</script>

<template>
  <q-page class="flex column">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        color="primary"
        fab
        :disable="!videoLink || downloading"
        :icon="videoLink ? 'file_download' : 'file_download_off'"
        @click="startDownload"
      />
    </q-page-sticky>
  </q-page>
</template>

<style scoped></style>
