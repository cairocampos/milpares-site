<template>
  <div>
    <button @click="onSelectStep('isCustomer')">
      JÁ POSSUO CADASTRO
    </button>
    <button @click="onSelectStep('Register')">
      NÃO POSSUO CADASTRO
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  onSelectStep: {
    type: Function,
    required:true
  }
})
</script>

<style scoped>
button {
  padding: 12px;
  border: none;
  border-radius: 10000px;
  width: 100%;
  margin-bottom: 12px;
  font-size: 22px;
  cursor: pointer;
}
div button:first-child {
  background-color: #F02866;
  color:#FFF;
}

div button:last-child {
  background-color: #FFF;
  color:#111;
  border: 1px solid #111;
}

</style>