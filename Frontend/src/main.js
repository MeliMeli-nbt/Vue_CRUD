import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/tailwind.css'
import './assets/css/custom.css'

axios.defaults.baseURL = 'http://localhost:3000'

createApp(App).use(store).use(router, axios).mount('#app')
