<template lang="pug">
li.reviews__item
  .review
    .review__author
      .review__avatar-area
        img.review__avatar(
          :src="this.$importImg(`reviews/${review.photo_ ? review.photo_: 'anonimous.jpg'}`)"
        )
      .author__area
        .review__name {{review.author}}
        .review__occup {{review.occ}}
    .review__info
      .review__text {{review.text}}
      .tools
        a.admin-review-buttons-edit(
          :class="selected ? 'selected' : ''"
          @click="!selected ? $emit('selectReview', review) : ''"
        )
          .admin-review-buttons-edit-text Править
          .admin-review-buttons-edit-icon
            svg
              use(:xlink:href="this.$importSvg('pencil')")          
        a.admin-review-buttons-remove(
          :class="selected ? 'selected' : ''"
          @click="!selected ? $emit('removeReview', review) : ''"
        )
          .admin-review-buttons-remove-text Удалить
          .admin-review-buttons-remove-icon
            svg
              use(:xlink:href="this.$importSvg('cross')")
          
</template>

<script>
export default {
  name: 'review',
  props: {
    review: Object,
    selected: Boolean
  }
}
</script>

<style lang="postcss" scoped>

.reviews__item {
  width: 100%;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(black, 0.07);
  &--new {
    background-image: linear-gradient(to right, $admin-grad-1, $admin-grad-2);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }
}

.review-editor {
  width: 100%;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(black, 0.07);
  margin-bottom: 30px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 
    1fr;
  grid-auto-rows:
    minmax(min-content, max-content);
  grid-template-areas: 
    "head"
    "body";
}

.review-editor__headline {
  grid-area: head;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $light-grey;
  padding: 30px 10px;
  border-bottom: 1px solid rgba($admin-grey, 0.15);
}

.review-editor__content {
  grid-area: body;
  padding: 50px 10px;
  display: grid;
  grid-auto-columns: 
    minmax(min-content, max-content);
  grid-auto-rows:
    minmax(min-content, max-content);
  grid-template-areas: 
    "left right";
}

.review-editor__pic-box {
  grid-area: left;
}

.review-editor__form {
  grid-area: right;
  width: 100%;
}

.review-editor__pic-desc {
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $blue-admin;
}

.reviev__field {
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $light-grey;
}

.review {
  padding: 30px 30px;
  display: grid;
  grid-template-columns: 
    1fr;
  grid-auto-rows:
    minmax(min-content, max-content);
  grid-template-areas: 
    "head"
    "body";
}

.review__author {
  display: flex;
  border-bottom: 1px solid rgba($admin-grey, 0.15);
  padding-bottom: 30px;
  grid-area: head;
}

.author__area {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.review__name {
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-light;
}

.review__occup {
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-light;
}

.review__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 30px;
  grid-area: body;
  min-height: 200px;
}

.review__text {
  opacity: 0.7;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-light;
}

.review__avatar-area {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 2.5%;
}

.review__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tools {
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
}

.admin-review-buttons-edit,
.admin-review-buttons-remove {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.admin-review-buttons-edit-icon svg {
  fill: $admin-grad-2;
  width: 15px;
  height: 15px;
  margin-top: 8px;
}

.admin-review-buttons-remove-icon svg {
  fill: $admin-red;
  width: 15px;
  height: 15px;
  margin-top: 8px;
}

.admin-review-buttons-edit-text,
.admin-review-buttons-remove-text {
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
  padding-right: 10px;
}

.selected {
  opacity: 0.3;
  cursor: default;
}

</style>