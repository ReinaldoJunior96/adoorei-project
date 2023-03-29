import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store' // importando o arquivo store

createApp(App)
    .use(router)
    .use(store) // adicionando o store
    .mount('#app')