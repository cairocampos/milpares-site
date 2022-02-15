import { createStore } from 'vuex';

interface ItemCart {
  id: number;
  quantidade:number;
  tamanho:string;
}

export default createStore({
  state: {
    carrinho: [] as ItemCart[],
  },
  mutations: {
    UPDATE_CARRINHO(state, payload: ItemCart) {
      // state.carrinho = payload;
      const storage = localStorage.getItem('cart');
      if (storage) {
        const data: ItemCart[] = JSON.parse(storage);
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
