import Vue from 'vue'
import Router from 'vue-router'
import app from '../App.vue';
import item from '../components/Item.vue';
import home from '../components/Home.vue';

Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    base: __dirname,
    routes: [
      { path: '/index', component: app },
      { path: '/home', component: home },
      { path: '/item', component: item }
    ]
  })
}