<script setup lang="ts">
import axios from 'axios';
import humanizeDuration from 'humanize-duration';
import { exportFile, useDialogPluginComponent } from 'quasar';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';

export interface Props {
  videoLink: string;
}

const props = defineProps<Props>();

const { dialogRef, onDialogHide } = useDialogPluginComponent();
defineEmits([...useDialogPluginComponent.emits]);

const controller = new AbortController();
const downloadStatus = reactive({
  estimated: 0.0,
  loaded: 0,
  progress: 0.0,
  rate: 0,
  total: 0,
});
const morphModel = ref('cancelButton');
const showDetails = ref(false);
const videoData = ref<Blob>();
const switchDetailInterval = setInterval(() => {
  showDetails.value = !showDetails.value;
}, 5000);
const autoUnit = (value: number) => {
  return Intl.NumberFormat('en', {
    notation: 'compact',
    style: 'unit',
    unit: 'byte',
    unitDisplay: 'narrow',
  }).format(value);
};

const switchDetailManually = () => {
  clearInterval(switchDetailInterval);
  showDetails.value = !showDetails.value;
};

const saveFile = () => {
  if (!videoData.value) {
    return;
  }
  exportFile('downloaded.mp4', videoData.value, 'video/mp4');
};

const cancelDownload = () => {
  morphModel.value = 'cancelButton';
  controller.abort();
  onDialogHide();
};

onMounted(async () => {
  try {
    const result = await axios.get(props.videoLink, {
      headers: { Range: 'bytes=0-' },
      onDownloadProgress: (progressEvent) => {
        downloadStatus.estimated =
          progressEvent.estimated ?? downloadStatus.estimated;
        downloadStatus.loaded = progressEvent.loaded ?? downloadStatus.loaded;
        downloadStatus.progress =
          progressEvent.progress ?? downloadStatus.progress;
        downloadStatus.rate = progressEvent.rate ?? downloadStatus.rate;
        downloadStatus.total = progressEvent.total ?? downloadStatus.total;
      },
      signal: controller.signal,
      responseType: 'blob',
    });
    videoData.value = result.data;
    saveFile();
  } catch (e) {
    console.warn(e);
  } finally {
    clearInterval(switchDetailInterval);
  }
});

onBeforeUnmount(() => {
  clearInterval(switchDetailInterval);
});
</script>

<template>
  <q-dialog
    seamless
    position="bottom"
    ref="dialogRef"
    persistent
    @hide="onDialogHide"
  >
    <q-card
      class="cursor-pointer"
      v-ripple
      style="min-width: 30rem"
      @click="switchDetailManually"
      @mouseleave="morphModel = 'cancelButton'"
    >
      <q-card-section>
        <div class="row items-center q-gutter-x-sm">
          <q-avatar color="primary" icon="movie" />
          <div class="column">
            <div class="text-weight-bold">Downloading video...</div>
            <div v-show="!showDetails" class="text-caption text-grey">
              Time Remaining:
              {{
                humanizeDuration(Math.floor(downloadStatus.estimated * 1000), {
                  largest: 2,
                  units: ['d', 'h', 'm', 's', 'ms'],
                })
              }}
            </div>
            <div v-show="showDetails" class="text-caption text-grey">
              Downloaded: {{ autoUnit(downloadStatus.loaded) }} /
              {{ autoUnit(downloadStatus.total) }}, Rate:
              {{ autoUnit(downloadStatus.rate) }}/s
            </div>
          </div>
          <q-space />
          <q-btn
            v-show="videoData"
            color="positive"
            round
            icon="save"
            unelevated
            @click.prevent.stop="saveFile"
          >
            <q-tooltip>Save File</q-tooltip>
          </q-btn>
          <q-btn
            v-morph:cancelButton:cancelGroup="morphModel"
            flat
            round
            icon="close"
            @click.prevent.stop="morphModel = 'cancelConfirm'"
          >
            <q-tooltip>Cancel Download</q-tooltip>
          </q-btn>
          <q-btn
            v-morph:cancelConfirm:cancelGroup="morphModel"
            color="negative"
            label="Cancel"
            @click.prevent.stop="cancelDownload"
          />
        </div>
      </q-card-section>
      <q-linear-progress :value="downloadStatus.progress" color="primary" />
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
