import {createApp} from 'vue'
import App from './App.vue'
import 'nprogress/nprogress.css'
import router from './router'
import './assets/stytle/global.scss'
import 'reset.css'
import 'animate.css'

const app = createApp(App)

app.use(router)
    .mount('#app')