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
        .edit-reviews-avatar.tooltip
          .edit-reviews-image
            img.admin-edit-reviews-avatar-img#edit-avatar-preview(  
                ref="reviewAvatar"               
                :src="getAvatar()"
                )
          input#reviews-photo(
            type="file"
            ref="reviewImage"
            @change="changeImgFile"
          )      
          .edit-reviews-avatar-text(
            @click="uploadImage"
          ) {{currentReview && currentReview.photo ? 'Изменить фото' : 'Добавить фото'}}
          .input-tooltip(:class="{'showed':validation.hasError('currentReview.photo')}") {{validation.firstError('currentReview.photo')}}
        .edit-reviews-comment  
          .edit-reviews-revier
            .edit-reviews-name
              adminInput.reviews-name(
                :labelText="'Имя автора'"
                :isInvalid="validation.hasError('currentReview.author')"
                :toolTipText="validation.firstError('currentReview.author')"
                :id="'reviews-name'"
                :type="'input'"
                :val="currentReview.author"
                @change="authorChange"
              )
            .edit-reviews-position
              adminInput.reviews-position(
                :labelText="'Титул автора'"
                :isInvalid="validation.hasError('currentReview.occ')"
                :toolTipText="validation.firstError('currentReview.occ')"
                :id="'reviews-position'"
                :type="'input'"
                :val="currentReview.occ"
                @change="occChange"
              )
          .edit-reviews-message
            adminInput.reviews-message(
              :labelText="'Отзыв'"
              :isInvalid="validation.hasError('currentReview.text')"
              :toolTipText="validation.firstError('currentReview.text')"
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
import review from "./review";
import adminInput from "./adminInput";
import SimpleVueValidator from "simple-vue-validator";
const Validator = SimpleVueValidator.Validator;
import { mapActions, mapState } from "vuex";

export default {
  mixins: [SimpleVueValidator.mixin],
  components: { review, adminInput },
  name: "reviews",
  data() {
    return {
      currentReview: null
    };
  },
  computed: {
    ...mapState("reviews", {
      reviews: state => state.reviews
    })
  },
  validators: {
    "currentReview.author"(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    "currentReview.occ"(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    "currentReview.text"(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    },
    "currentReview.photo"(value) {
      return Validator.value(value).required("Необходимо загрузить фото");
    }
  },
  methods: {
    ...mapActions("reviews", [
      "fetchReviews",
      "removeReview",
      "saveReview",
      "addReview"
    ]),
    cancelEdit() {
      this.currentReview = null;
    },
    uploadImage() {
      this.$refs.reviewImage.click();
    },
    changeImgFile(e) {
      this.currentReview.photo = e.target.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        var imgtag = document.getElementById("edit-avatar-preview");
        imgtag.src = event.target.result;
      };

      reader.readAsDataURL(this.currentReview.photo);
    },
    getAvatar() {
      if (typeof this.currentReview.photo == "Object") {
        var reader = new FileReader();

        reader.onload = function(event) {
          var imgtag = document.getElementById("edit-avatar-preview");
          imgtag.src = event.target.result;
        };

        reader.readAsDataURL(this.currentReview.photo);
      }
      if (this.currentReview && this.currentReview.id) {
        return this.$baseUrl + this.currentReview.photo;
      } else {
        return this.$importImg(`reviews/anonimous.jpg`);
      }
    },
    saveEdit() {
      this.$validate().then(success => {
        if (success) {
          if (!this.currentReview.id) {
            var formData = new FormData();
            formData.append("author", this.currentReview.author);
            formData.append("occ", this.currentReview.occ);
            formData.append("photo", this.currentReview.photo);
            formData.append("text", this.currentReview.text);

            this.addReview(formData);
          } else {
            var formData = new FormData();
            formData.append("author", this.currentReview.author);
            formData.append("occ", this.currentReview.occ);
            formData.append("photo", this.currentReview.photo);
            formData.append("text", this.currentReview.text);

            this.saveReview({
              reviewId: this.currentReview.id,
              formData: formData
            });
          }
          this.currentReview = null;
        }
      });
    },
    authorChange(value) {
      this.currentReview.author = value;
    },
    occChange(value) {
      this.currentReview.occ = value;
    },
    messageChange(value) {
      this.currentReview.text = value;
    },
    addNewReviews() {
      this.currentReview = {
        id: null,
        photo: null,
        author: "",
        occ: "",
        text: ""
      };
      this.validation.reset();
    },
    selectReview(review) {
      this.currentReview = { ...review };
    }
  },
  created() {
    this.fetchReviews(this.$user.id);
  }
};
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