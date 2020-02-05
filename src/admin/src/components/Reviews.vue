<template lang="pug">
.container
  .admin-section.reviews-section
    .headline
      .headline__text  Блок «Отзывы»
    
    .edit-reviews(
      v-if="currentReview != null"
    )
      .edit-reviews-title 
        .edit-reviews-title-text Новый отзыв
      hr  
      .edit-reviews-body
        .edit-reviews-avatar
          .edit-reviews-image
            img.admin-edit-reviews-avatar-img(                 
              :src="this.$importImg(`reviews/${currentReview && currentReview.author_pic ? currentReview.author_pic: 'anonimous.jpg'}`)"
            )
          .edit-reviews-avatar-text {{currentReview && currentReview.author_pic ? 'Изменить фото' : 'Добавить фото'}}
        .edit-reviews-comment  
          .edit-reviews-revier
            .edit-reviews-name
              adminInput.reviews-name(
                :labelText="'Имя автора'"
                :isInvalid="false"
                :toolTipText="'toolTipText'"
                :id="'reviews-name'"
                :type="'input'"
                :val="currentReview.author_name"
                @change="nameChange"
              )
            .edit-reviews-position
              adminInput.reviews-position(
                :labelText="'Титул автора'"
                :isInvalid="false"
                :toolTipText="'toolTipText'"
                :id="'reviews-position'"
                :type="'input'"
                :val="currentReview.author_occ"
                @change="positionChange"
              )
          .edit-reviews-message
            adminInput.reviews-message(
              :labelText="'Отзыв'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'reviews-message'"
              :type="'textarea'"
              :val="currentReview.text"
              @change="messageChange"
            )
          .edit-reviews-buttons
            .edit-reviews-cancel(
              @click="cancelEdit"
            ) Отмена
            .edit-reviews-save(
              @click="saveEdit"
            )
              loadButton(
                text="СОХРАНИТЬ"
              )

    .reviews
      ul.reviews__list
        li.reviews__item.reviews__item--new(
          @click="addNewReviews"
        )
          .add-element__pic
            span +
          .add-element__text 
            span Добавить отзыв
        review(
          v-for="(review, index) in reviews"
          :review="review"
          :selected="currentReview && review.id == currentReview.id"
          @selectReview="selectReview"
          @removeReview="removeReview"
          :key="index"
        )
</template>

<script>
import review from './Review';
import adminInput from './AdminInput';
import loadButton from './LoadButton';
export default {
  name: 'reviews',
  components: { review, adminInput, loadButton },
  data() {
    return {
      reviews: [],
      currentReview: null
    };
  },
  created() {
    this.reviews = require("../../../data/reviews.json");
  },
  methods:{
    cancelEdit(){
      this.currentReview = null;
    },
    saveEdit(){
      if(!this.currentReview.id){
        this.currentReview.id = this.reviews[this.reviews.length - 1].id + 1;
        this.reviews.push(this.currentReview);
      }
      else{
        let tmp = this.reviews.find(f => f.id == this.currentReview.id); 
        this.reviews[this.reviews.indexOf(tmp)] = this.currentReview;
      }
      this.currentReview = null;
    },
    nameChange(value){
      this.currentReview.author_name = value;
    },
    positionChange(value){
      this.currentReview.author_occ = value;
    },
    messageChange(value){
      this.currentReview.text = value;
    },
    addNewReviews(){
      this.currentReview = {
        id: null,
        text: '',
        author_name: '',
        author_occ: '',
        author_pic: ''
      }
    },
    selectReview(review){
      this.currentReview = {...review};
    },
    removeReview(review){
      this.reviews.splice(this.reviews.indexOf(review), 1);
    }
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
  &--new {
    background-image: linear-gradient(to right, $admin-grad-1, $admin-grad-2);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }
}


.edit-reviews {
  padding: 30px;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
  margin-bottom: 20px;
}

.edit-reviews-title {
  padding-bottom: 25px;
  padding-left: 10px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.89;
}

hr {
  opacity: 0.15;
}

.edit-reviews-body {
  display: flex;
  padding-top: 50px;
}

.admin-edit-reviews-avatar-img {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  object-fit: cover;
}

.edit-reviews-avatar {
  width:200px;
  height:200px;
}

.edit-reviews-avatar-text {
  padding-top: 30px;
  font-size: 16px;
  font-weight: 600;
  line-height: 2.13;
  color: #383bcf;
  text-align: center;
}

.edit-reviews-revier {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap:30px;
}

.edit-reviews-comment {
  padding-left: 30px;
  width:100%;
  max-width: 700px;
}

.edit-reviews-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.edit-reviews-cancel {
  font-weight: 600;
  line-height: 2.13;
  color: #383bcf;
  padding-right: 60px;
  cursor: pointer;
}

.edit-reviews-save {
  height: 60px;
  width: 180px
}

</style>