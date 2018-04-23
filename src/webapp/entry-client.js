import { createApp } from './app.js'
const { app, router, store } = createApp()

router.onReady(() => {
  app.$mount('#app')
})