import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import VTooltip from 'v-tooltip'

createApp(App).use(router).use(PerfectScrollbar).use(VTooltip).mount('#app')