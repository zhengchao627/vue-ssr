import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'
Vue.use(Vuex)

const defaultState = {
  user: {}
}

const inBrowser = typeof window !== 'undefined';
console.log('前端开发环境',process.env.NODE_ENV);
if (!inBrowser || process.env.NODE_ENV == "development") {
  Vue.use(Vuex);
}
// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

const mutations = {
  GET_USER: (state, user) => {
      state.user = user
  },

}

export function createStore() {
  const store = new Vuex.Store({
      state,
      actions,
      mutations,
      getters
  });
  return store;
}
