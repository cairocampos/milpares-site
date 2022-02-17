<template>
  <div class="custom-backdrop"></div>
</template>

<style scoped>
.custom-backdrop {
  min-height: 100vh;
  width: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left:0;
  z-index: 10;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>