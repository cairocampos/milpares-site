import { ICarrinho } from '@/interfaces/ICarrinho';
import { createStore } from 'vuex';

export default createStore({
  state: {
    carrinho: [] as ICarrinho[],
  },
  mutations: {
    SET_CARRINHO(state, payload: ICarrinho[]) {
      state.carrinho = payload
    },
    UPDATE_CARRINHO(state, payload: ICarrinho) {
      // state.carrinho = payload;
      const storage = localStorage.getItem('cart');
      if (storage) {
        const data: ICarrinho[] = JSON.parse(storage);
        const item = data.find(el => (
          el.cor_id == payload.cor_id && el.id == payload.id && el.tamanho == payload.tamanho
        ))
        
        if(!item) {
          data.push(payload);
          state.carrinho = data;
          localStorage.setItem('cart', JSON.stringify(data));
        }

      } else {
        localStorage.setItem('cart', JSON.stringify([payload]));
      }
    },
  },
  actions: {
    verificaItensNoCarrinho() {
      //
    },
    async removeItemCarrinho({getters,commit}, data: ICarrinho)  {
      const items: ICarrinho[] = await getters['getCarrinhoStorage'];
      const findIndex = items.findIndex(item => (
        item.id == data.id && item.tamanho == data.tamanho && item.cor_id == data.cor_id
      ))

      if(findIndex !== -1) {
        items.splice(findIndex, 1);
        localStorage.setItem('cart', JSON.stringify(items));
        commit('SET_CARRINHO', items);
      }
    },
    async updateItemCarrinho({getters, commit},data: ICarrinho) {
      const items: ICarrinho[] = await getters['getCarrinhoStorage'];
      const findIndex = items.findIndex(item => (
        item.id == data.id && item.tamanho == data.tamanho && item.cor_id == data.cor_id
      ))

      if(findIndex !== -1) {
        items[findIndex] = data;
        localStorage.setItem('cart', JSON.stringify(items));
        commit('SET_CARRINHO', items);
      }
    }
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
    getCarrinhoStorage() {
      try {
        const storage = localStorage.getItem('cart');
        return storage ? JSON.parse(storage) : []
      } catch (error) {
        return []
      }
    }
  },
});
