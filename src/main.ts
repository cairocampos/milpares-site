import { createApp } from 'vue';
import Loading from '@/components/global/Loading.vue';
import App from './App.vue';
import router from './router';
import store from './store';
const app = createApp(App);
app
.component('Loading', Loading)
.use(store).use(router)
.mount('#app');

app.filter?.('currency', (intval: number) => {
  intval = intval / 100;
  return intval.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})
})

console.log(process.env);
