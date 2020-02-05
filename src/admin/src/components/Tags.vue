<template lang="pug">
.tags__list
  li.tags__item.tag(v-for="tag in tagsArray")
    .tag__text {{ tag }}

</template>

<script>
export default {
  name: 'tags',
  props: [ 'tags' ],
  computed: {
    tagsArray() {
      return this.tags.split(', ');
    }
  },
}
</script>

<style lang="postcss" scoped>
.tags__list {
  display: flex;
}

.tags__item{
  display: flex;
  width: max-content;
  padding: 3px 10px;
  background-color: #e6e6e6;
  border-radius: 25px;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
}

.tag__text {
  opacity: 0.7;
  font-size: 13px;
  font-weight: 600;
}
</style>