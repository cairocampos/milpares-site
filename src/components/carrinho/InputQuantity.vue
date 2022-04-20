<template>
  <div class="input">
    {{ modelValue }}
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    modelValue: {
      type: [String,Number],
      required:true
    },
    quantity: {
      type: [String, Number],
      required:true
    }
  },
  emits:['update:modelValue'],
  setup(props) {
    //
  }
})
</script>

<style lang='scss' scoped>
.input {
  text-align: center;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  font-size: 14px;
  padding: 0.5rem 0rem;
  max-width: 40px;
  margin: 0 5px;
}
</style>
