<template>
  <div
    class="custom-sidenav"
  >
    <div class="sidenav-header">
      <button @click="close()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style="height:20px;width:20px;"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Fechar
      </button>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    show:Boolean
  },
  emits:['update:show'],
  setup(props, {emit}) {
    const store = useStore();
    const close = () => {
      emit('update:show',false);
    }

    onMounted(() => {
      store.dispatch('showBackdrop');
    })

    onUnmounted(() => store.dispatch('hideBackdrop'))

    return {
      close
    }
  },
})
</script>


<style scoped>
.sidenav-header {
  margin-bottom: 32px;
}
button {
  cursor: pointer;
  background-color: transparent;
  border:none;
  display:flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}
.custom-sidenav {
  height: 100%;
  width: 0;
  background-color: #FFF;
  z-index: 20;
  top: 0;
  right: 0;
  position: fixed;
  transition: all .3s;
  padding: 32px 16px;
  width: 320px;
}

</style>