import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { notivue } from 'notivue'
import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import './style.css'
import 'notivue/notifications.css' 
import 'notivue/animations.css'
import 'filepond/dist/filepond.min.css';

const app = createApp(App)
const FilePond = vueFilePond(FilePondPluginFileValidateType);

app.use(notivue) 
app.use(router)
app.component('FilePond', FilePond);
app.mount('#app')