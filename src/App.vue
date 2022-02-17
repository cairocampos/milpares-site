<template>
  <Backdrop v-if="store.state.backdrop" />
  <div id="nav">
    <AppHeader />
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
import { defineComponent } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import Backdrop from './components/Backdrop.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    AppHeader,
    AppFooter,
    Backdrop
},
  setup() {
    const store = useStore();

    return {
      store
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
