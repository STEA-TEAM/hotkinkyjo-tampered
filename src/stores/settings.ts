import { defineStore } from 'pinia';
import { AddressbarColor, colors, Dark } from 'quasar';
import { computed, ref } from 'vue';

import { gm_storage } from 'utils/storage';

const { getPaletteColor } = colors;
const darkModes = [false, 'auto', true] as const;
export const useSettingsStore = defineStore(
  'settings',
  () => {
    const darkMode = ref<'auto' | boolean>(Dark.mode);
    const darkModeColorAndIcon = computed(() => {
      switch (darkMode.value) {
        case false:
          return { color: 'orange', icon: 'light_mode' };
        case 'auto':
          return { color: 'teal', icon: 'hdr_auto' };
        default:
          return { color: 'yellow', icon: 'dark_mode' };
      }
    });

    const applyDarkMode = () => {
      Dark.set(darkMode.value);
      AddressbarColor.set(
        Dark.isActive ? getPaletteColor('grey-10') : getPaletteColor('grey-2')
      );
    };

    const toggleDarkMode = () => {
      const index = darkModes.indexOf(darkMode.value);
      darkMode.value = darkModes[(index + 1) % darkModes.length];
      applyDarkMode();
    };

    return {
      darkMode,
      darkModeColorAndIcon,
      applyDarkMode,
      toggleDarkMode,
    };
  },
  {
    persist: {
      storage: gm_storage,
    },
  }
);
