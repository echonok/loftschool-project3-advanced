<template lang="pug">
.load-button
  button {{ text }}
</template>

<script>
export default {
  name: 'load-button',
  props: ['text']
}
</script>

<style lang="postcss" scoped>
.load-button {
  display: flex;
  //width: 100%;
  //height: 100%;
  background-image: linear-gradient(to right, $admin-grad-1, $admin-grad-2);
  border-radius: 30px;
  justify-content: center;
  align-items: center;  
  cursor: pointer;  
}

button {
  background: transparent;
  color: #ffffff;
  font-weight: 600;
  line-height: 1;
  padding: 20px 40px;
}
</style>