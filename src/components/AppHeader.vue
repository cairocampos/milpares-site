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
        <li><router-link to="/produtos">Produtos</router-link></li>
        <li><router-link to="/produtos/promocao">Promoção</router-link></li>
        <li><a :href="PAINEL_MILPARES" target="_blank">Franqueado</a></li>
        <li><a :href="PAINEL_MILPARES" target="_blank">Revendedor</a></li>
        <li>
          <router-link to="/carrinho" class="cart-bag">
            <img src="/assets/images/cart.png" alt="Cart Logo" />
            <span class="cart-content-count">2</span>
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" onclick="openHeaderMenu()"
            ><i class="icofont-navigation-menu"></i
          ></a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const PAINEL_MILPARES = process.env.VUE_APP_PAINEL;

    return {
      PAINEL_MILPARES,
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
