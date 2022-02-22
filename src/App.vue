<template>
  <Backdrop v-if="store.state.backdrop" />
  <MenuMobile
    v-if="showMenuMobile"
    v-model:showMenuMobile="showMenuMobile"
  />
  <div id="nav">
    <AppHeader @on-click-menu-mobile="showMenuMobile = true" />
  </div>
  <router-view v-slot="{ Component, route }">
    <transition
      name="fade"
      mode="out-in"
    >
      <component
        :is="Component"
        :key="route.path"
      />
    </transition>
  </router-view>
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import Backdrop from './components/Backdrop.vue';
import { useStore } from 'vuex';
import MenuMobile from './components/MenuMobile.vue';

export default defineComponent({
  components: {
    AppHeader,
    AppFooter,
    Backdrop,
    MenuMobile
},
  setup() {
    const store = useStore();
    const showMenuMobile = ref(false);
    return {
      store,
      showMenuMobile
    }
  },
});
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

</style>
