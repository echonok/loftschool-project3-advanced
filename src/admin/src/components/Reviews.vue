<template lang="pug">
.container
  .admin-section.reviews-section
    .headline
      .headline__text  Блок «Отзывы»
    
    .review-editor.editor
      .review-editor__headline Новый отзыв
      .review-editor__content
        .review-editor__pic-box
          .review-editor__pic-area
            .review-editor__pic
          .review-editor__pic-desc Добавить фото
        form.review-editor__form
          .editor-buttons
            .editor-button.editor-button--cancel Отмена
            .editor-button.editor-button--save Сохранить
    


    .reviews
      ul.reviews__list
        li.reviews__item.reviews__item--new
          .add-element__pic
            span +
          .add-element__text 
            span Добавить отзыв
        li.reviews__item(v-for="review in reviews")
          .review
            .review__author
              .review__avatar {{review.author_pic}}
              .author__area
                .review__name {{review.author_name}}
                .review__occup {{review.author_occ}}
            .review__info
              .review__text {{review.text}}
              .tools
                a.tools__edit
                  .btn__pic-area
                    .btn__pic
                  .btn__title Править
                a.tools__del
                  .btn__pic-area
                    .btn__pic
                  .btn__title Удалить
</template>
<script>
export default {
  name: 'reviews',
  data() {
    return {
      reviews: []
    };
  },
  created() {
    this.reviews = require("../../../data/reviews.json");
  }
}
</script>
<style lang="postcss">

.reviews {
  display: flex;
  flex-direction: column;
}

.reviews__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  .reviews__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
  }
}

@media screen and (max-width: 600px) {
  .reviews__list {
    display: grid;
    grid-template-columns: 1fr;
  }
}

.reviews__item {
  width: 100%;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(black, 0.07);
  margin-bottom: 30px;
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

</style>