import { ICarrinho } from '@/interfaces/ICarrinho';
import { createStore } from 'vuex';

export default createStore({
  state: {
    backdrop:false,
    carrinho: [] as ICarrinho[],
  },
  mutations: {
    UPDATE_BACKDROP(state,payload:boolean) {
      state.backdrop = payload
    },
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
    verificarCarrinho({commit, getters}) {
      const carrinho = getters.getCarrinhoStorage;
      console.log(carrinho)
      commit('SET_CARRINHO', carrinho);
    },
    limparCarrinho({commit}) {
      localStorage.removeItem('cart');
      commit('SET_CARRINHO', []);
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
    },
    showBackdrop({commit}) {
      commit('UPDATE_BACKDROP', true)
    },
    hideBackdrop({commit}) {
      commit('UPDATE_BACKDROP', false)
    }
  },
  modules: {
  },
  getters: {
    getCarrinho({ carrinho }) {
      return carrinho;
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
