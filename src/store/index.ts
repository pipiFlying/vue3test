import { createStore } from 'vuex';
import { storeUser } from '@/utils';
import * as types from './types';

export default createStore({
  state: {
    token: '',
    userInfo: null,
    loading: false
  },
  getters: {
    token: ({ token }) => token || storeUser.get('token'),
    loading: ({ loading }) => loading
  },
  mutations: {
    [types.SET_TOKEN]: (state, token) => {
      state.token = token;
      storeUser.set('token', token);
    },
    [types.SET_LOADING]: (state, loading) => {
      state.loading = loading;
    }
  },
  actions: {
    SET_TOKEN: ({ commit }, token) => {
      commit('setToken', token);
    },
    SET_LOADING: ({ commit }, loading) => {
      commit('setLoading', loading);
    }
  },
  modules: {}
});
