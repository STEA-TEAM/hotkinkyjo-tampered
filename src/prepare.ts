import { addElement } from 'utils/dom';

export const prepare = async () => {
  switch (location.hostname) {
    case 'hotkinkyjo.xxx': {
      addElement('div', '', {
        id: '__hotkinkyjo_tampered__',
        style: 'pointer-events: none',
      });
      return true;
    }
    default: {
      return false;
    }
  }
};
