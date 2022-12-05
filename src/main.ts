import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import NodeCat from './plugins/node';
import './mock/mockApi';
import 'amfe-flexible/index.js';
import LoginVue from 'sdk-vue';

const app = createApp(App);

app.use(LoginVue);

// 定义一个全局变变量
app.config.globalProperties.CODE_OK = 200;

app.use(NodeCat);

app.use(store).use(router).use(ElementPlus).mount('#app');
