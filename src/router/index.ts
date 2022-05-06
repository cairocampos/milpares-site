import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Produtos from '../views/Produtos.vue';
import Promocional from '../views/Promocional.vue';
import Produto from '../views/Produto.vue';
import Carrinho from '../views/Carrinho.vue';
import Revendedor from '../views/Revendedor.vue';
import ClubeDesconto from '../views/ClubeDesconto.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: Produtos,
  },
  {
    path: '/promocao',
    name: 'promocional',
    component: Promocional,
  },
  {
    path: '/produtos/:id/detalhes',
    name: 'produto',
    props: true,
    component: Produto,
  },
  {
    path: '/carrinho',
    name: 'carrinho',
    component: Carrinho,
  },
  {
    path: '/revendedor',
    name: 'revendedor',
    component: Revendedor,
  },
  {
    path: '/clube-do-desconto',
    name: 'clube-desconto',
    component: ClubeDesconto,
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
