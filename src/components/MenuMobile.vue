<template>
  <aside>
    <div
      v-if="open"
      class="backdrop"
    ></div>
    <div
      id="headerSidenav"
      class="sidenav"
      :class="{active: open}"
    >
      <div class="pink-side-nav-banner cart">
        <h2>Menu</h2>
        <div>
          <a
            href="#"
            class="cart-bag"
            style="outline:none;color:#FFF"
            @click="toggle()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="height:24px;"
              fill="#FFF"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </a>
        </div>
      </div>
      <ul>
        <li @click="closeNavigator">
          <router-link to="/produtos">
            Produtos
          </router-link>
        </li>
        <li @click="closeNavigator">
          <router-link to="/produtos/promocao">
            Promoção
          </router-link>
        </li>
        <li @click="closeNavigator">
          <a
            :href="PAINEL_MILPARES"
            target="_blank"
          >Franqueado</a>
        </li>
        <li @click="closeNavigator">
          <a
            :href="PAINEL_MILPARES"
            target="_blank"
          >Revendedor</a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  emits:['update:showMenuMobile'],
  setup(props,{emit}) {
    const open = ref(false);
    const PAINEL_MILPARES = process.env.VUE_APP_PAINEL;

    
    const toggle = () => {
      setTimeout(() => {
        open.value = !open.value
        if(!open.value) {
          emit('update:showMenuMobile', false)
        }
      }, 100)
    }

    onMounted(() => toggle())

    const closeNavigator = () => toggle();

    return {
      open,
      toggle,
      PAINEL_MILPARES,
      closeNavigator
    }
  },
})
</script>


<style scoped>
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0px 0px 3px #333;
  overflow-x: hidden;
  transition: 0.3s;
}

.sidenav.active {
  width: 250px;
}

.sidenav ul {
  padding: 3rem;
}

.sidenav ul li,.sidenav ul li a {
  margin-bottom: 1rem;
  font-family: Gotham-Light;
  font-weight: 900;
}

.sidenav ul li:hover,.sidenav ul li a:hover  {
  color: #e61655;
  text-decoration: underline 3px solid #e61655;
}

.backdrop {
  z-index: 10;
  width: 100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  background-color: rgba(0,0,0,.5);
}

@media (max-width: 420px) {
  .sidenav.active {
    width: 100%;
  }
}

</style>