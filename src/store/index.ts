import { ICarrinho } from '@/interfaces/ICarrinho';
import { createStore } from 'vuex';

export default createStore({
  state: {
    carrinho: [] as ICarrinho[],
  },
  mutations: {
    UPDATE_CARRINHO(state, payload: ICarrinho) {
      // state.carrinho = payload;
      const storage = localStorage.getItem('cart');
      if (storage) {
        const data: ICarrinho[] = JSON.parse(storage);
        data.push(payload);
        state.carrinho = data;
        localStorage.setItem('cart', JSON.stringify(data));
      } else {
        localStorage.setItem('cart', JSON.stringify([payload]));
      }
    },
  },
  actions: {
    verificaItensNoCarrinho() {
      //
    },
  },
  modules: {
  },
  getters: {
    getCarrinho({ carrinho }) {
      if (carrinho.length) { return carrinho; }

      const storage = localStorage.getItem('cart');
      if (storage) {
        const data = JSON.parse(storage);
        return data;
      }

      return [];
    },
  },
});
