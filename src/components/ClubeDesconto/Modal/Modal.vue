<template>
  <div
    class="backdrop"
    @click="emit('update:modelValue', false)"
  ></div>
  <div class="modal">
    <div class="modal-header">
      <button
        class="modal-close-button"
        @click="emit('update:modelValue', false)"
      >
        &times;
      </button>
      <h3>BEM-VINDO AO</h3>
      <h1>CLUBE DO DESCONTO MIL PARES!</h1>
    </div>
    <div class="modal-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.backdrop {
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  left: 0;
}

.modal {
  max-width: 500px;
  background-color: #FFF;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  box-shadow: 0 0 1px 0px #000;
}

@media(max-width: 768px) {
  .modal {
    width: 90vw;
  }

  .modal-body {
    max-height: 500px;
    overflow-y: auto;
  }
}

.modal-header {
  background-color: #111;
  color:#FFF;
  font-family: Arial, Helvetica, sans-serif;
  padding: 32px;
  position:relative;
}

.modal-header h3 {
  font-weight: lighter;
}

.modal-body {
  padding: 12px;
}

.modal-close-button {
  background-color: #F02866;
  color:#FFF;
  border: none;
  font-size: 22px;
  padding: 4px 8px;
  position:absolute;
  left:0;
  top:0;
  cursor: pointer;
}
</style>