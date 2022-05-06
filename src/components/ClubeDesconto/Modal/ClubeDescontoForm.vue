<template>
  <ChangeStepButtons
    v-if="!step"
    :on-select-step="handleSelectStep"
  />
  <template v-else>
    <IsCustomer
      v-if="step == 'isCustomer'"
      :on-restart-requested="handleRestartRequested"
      :on-finished="() => emit('finished')"
    />
    <Register
      v-else
      :on-restart-requested="handleRestartRequested"
      :on-finished="() => emit('finished')"
    />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChangeStepButtons from './ChangeStepButtons.vue';
import IsCustomer from './IsCustomer.vue';
import Register from './Register.vue';
const emit = defineEmits(['finished']);
const step = ref<string|null>(null)

function handleSelectStep(type:string) {
  step.value = type
}

function handleRestartRequested() {
  step.value = null
}

</script>

<style scoped>

</style>