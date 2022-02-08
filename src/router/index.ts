import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Produtos from '../views/Produtos.vue';
import Produto from '../views/Produto.vue';
import Carrinho from '../views/Carrinho.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/produtos/:type?',
    name: 'Produtos',
    component: Produtos,
  },
  {
    path: '/produto/:id',
    name: 'Produto',
    component: Produto,
  },
  {
    path: '/carrinho',
    name: 'Carrinho',
    component: Carrinho,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
});

export default router;
