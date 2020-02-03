<template lang="pug">

  li.tags__item.tag
    .tag__text {{ tags }}

</template>

<script>
export default {
  name: 'tags',
  props: [ 'tags' ]
}
</script>

<style lang="postcss" scoped>
.tags__item{
  display: flex;
  width: max-content;
  padding: 3px 10px;
  background-color: #e6e6e6;
  border-radius: 25px;
}

.tag__text {
  opacity: 0.7;
  font-size: 13px;
  font-weight: 600;
}
</style>