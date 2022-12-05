import store from '@/store';

class Loading {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}
  open() {
    store.dispatch('SET_LOADING', true);
  }

  close() {
    store.dispatch('SET_LOADING', false);
  }
}

export const loading = new Loading();
