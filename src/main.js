import { createApp } from 'vue'
import App from './App.vue'
// Use phosphor icons
import PhosphorVue from "phosphor-vue";
// CSS Main style
import './assets/main.css'

const app = createApp(App);
app.use(PhosphorVue);
app.mount('#app');
