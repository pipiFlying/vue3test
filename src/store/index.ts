import { createStore } from 'vuex';
import { storeUser } from '@/utils';
import * as types from './types';

export default createStore({
  state: {
    token: '',
    userInfo: null
  },
  getters: {
    token: ({ token }) => token || storeUser.get('token')
  },
  mutations: {
    [types.SET_TOKEN]: (state, token) => {
      state.token = token;
      storeUser.set('token', token);
    }
  },
  actions: {
    SET_TOKEN: ({ commit }, token) => {
      commit('setToken', token);
    }
  },
  modules: {}
});
