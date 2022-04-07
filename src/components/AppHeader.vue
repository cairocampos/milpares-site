<template>
  <header class="header">
    <div>
      <router-link to="/">
        <img
          class="header-logo"
          src="/assets/images/logo.png"
          alt="Header Logo"
        />
      </router-link>
    </div>
    <div class="header-links-div">
      <ul>
        <li>
          <router-link to="/produtos">
            Produtos
          </router-link>
        </li>
        <li>
          <router-link to="/promocao">
            Promoção
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/clube-do-desconto">
            Clube do Desconto
          </router-link>
        </li> -->
        <li>
          <a
            :href="PAINEL_MILPARES"
            target="_blank"
          >Franqueado</a>
        </li>
        <li>
          <router-link to="/revendedor">
            Revendedor
          </router-link>
        </li>
        <li>
          <router-link
            to="/carrinho"
            class="cart-bag"
          >
            <img
              src="/assets/images/cart.png"
              alt="Cart Logo"
            />
            <span class="cart-content-count">
              {{ carrinhoTotal }}
            </span>
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <a
            href="#"
            @click="openHeaderMenu"
          ><i class="icofont-navigation-menu"></i></a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  emits: ['on-click-menu-mobile'],
  setup(props, {emit}) {
    const store = useStore();
    const PAINEL_MILPARES = process.env.VUE_APP_PAINEL;

    const carrinhoTotal = computed(() => {
      return store.getters.getCarrinho.length
    })

    const openHeaderMenu = () => {
      emit('on-click-menu-mobile');
    }

    return {
      PAINEL_MILPARES,
      carrinhoTotal,
      openHeaderMenu
    };
  },
});
</script>

<style scoped>
.header {
  border-bottom: 10px solid #e61655;
}

.router-link-exact-active {
  color: #ef2866;
  font-family: Gotham-Bold;
}

</style>
