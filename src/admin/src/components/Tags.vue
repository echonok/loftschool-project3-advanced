<template lang="pug">
  .tags__item(
    v-if="tag != ''"
  )
    .tags__item-text {{tag}}
    .tags__item-exit(
      v-if="edit"
      @click="$emit('removeTag', tag)"
    ) &#215;
</template>

<script>
export default {
  name: "tags",
  props: ["tag", "edit"]
};
</script>

<style lang="postcss" scoped>
.tags__item {
  display: flex;
  width: max-content;
  align-items: center;
  padding: 3px 10px;
  background-color: #ffffff;
  border-radius: 25px;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
}

.tags__item-text {
  opacity: 0.7;
  font-size: 13px;
  font-weight: 600;
}

.tags__item-exit {
  padding-left: 5px;
  opacity: 0.7;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}

.edit-tag {
  background-color: #f4f4f4;
  color: #283340;
  opacity: 1;
}
</style>