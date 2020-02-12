<template lang="pug">
.container
  .admin-section.works-section
    .headline
      .headline__text Блок «Работы»
    .works
      
      .work-editor(
        v-if="currentWork != null"
      )
        .work-editor-title 
          .work-editor-title-text Редактирование работы
        hr
        .work-editor-body
          .import-image-wrapper 
            .admin-preview(
              v-if="currentWork.photo"
            )
              img.admin-edit-image-img#edit-img-preview(                 
                :src="this.$baseUrl + currentWork.photo"
              )
              .admin-preview-text  Изменить превью
            .import-image(
                v-if="!currentWork.photo"
              )
              .import-image-content
                .import-image-text
                  span Перетащите или загрузите
                  br
                  span для загрузки изображения
                .load-button-wrapper(
                  @click="uploadImage"
                )
                  load-button(
                    text="ЗАГРУЗИТЬ"
                  )
          input#work-photo(
            type="file"
            ref="workImage"
            @change="changeImgFile"
          )
          .work-description
            admin-input.name-work(
              :labelText="'Название'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'name-work'"
              :type="'input'"
              :val="currentWork.title"
              @change="titleChange"
            )

            admin-input.link-work(
              :labelText="'Ссылка'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'link-work'"
              :type="'input'"
              :val="currentWork.link"
              @change="linkChange"
            )

            admin-input.desc-work(
              :labelText="'Описание'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'desc-work'"
              :type="'textarea'"
              :val="currentWork.desc"
              @change="descChange"
            )

            admin-input.tags-work(
              :labelText="'Добавление тэга'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'tags-work'"
              :type="'input'"
              :val="currentWork.skills"
              @change="tagsChange"
            )
            .admin-tags
              tags.edit-tag(
                :tags="currentWork.skills"
                :edit="true"
                @removeTag="removeTag"
              )
        .work-editor-buttons
          .work-editor-cancel(
            @click="cancelEdit"
          ) Отмена
          .work-editor-save(
            @click="saveEdit"
          )
            load-button(
              text="СОХРАНИТЬ"
            )

      ul.works__list
        li.works__item.works__item--new(
          @click="addNewWork"
        )
          .add-element__pic
            span +
          .add-element__text 
            span Добавить работу
        work(
          v-for="(work, index) in works"
          :work="work"
          :selected="currentWork && work.id == currentWork.id"
          @selectWork="selectWork"
          @removeWork="removeWork"
          :key="index"
        )

</template>

<script>
import SimpleVueValidator from "simple-vue-validator";
const Validator = SimpleVueValidator.Validator;
import { mapActions, mapState } from "vuex";

import work from './Work';
import loadButton from './loadButton';
import adminInput from './adminInput';
import tags from './tags';
export default {
  mixins: [SimpleVueValidator.mixin] ,
  name: 'works',
  components: { work, loadButton, adminInput, tags },
  data() {
    return {
      currentWork: null,
      works: []
    };
  },
  beforeMount(){
    this.$axios.get(`/works/269`)
    //this.$axios.get(`/works/${this.$user.id}`)
    .then(Response => {
      this.works = Response.data;
    })
    .catch(error => {
      console.log(error.Response);
    });
  },
  created() {
    this.works = require("../../../data/works.json");
  },
  computed: {
    tagsArray() {
      return this.currentWork.skills.split(', ');
    }
  },
  methods:{
    removeTag(val){
      let tags = [...this.currentWork.skills]
      tags.forEach((element, i) => {
        if(element == val){
          tags.splice(i, 1);
        }
      this.currentWork.skills = tags;
      });
    },
    uploadImage(){
      this.$refs.workImage.click();
    },
    changeImgFile(e){
      this.currentWork.photo = e.target.files[0];
      let reader = new FileReader();

      reader.onload = function(event) {
        let imgtag = document.getElementById("edit-img-preview");
        imgtag.src = event.target.result;
      };

      reader.readAsDataURL(this.currentWork.photo);
    },
    titleChange(value){
      this.currentWork.title = value;
    },
    linkChange(value){
      this.currentWork.link = value;
    },
    descChange(value){
      this.currentWork.desc = value;
    },
    tagsChange(value){
      this.currentWork.skills = value.split(', ');
    },
    selectWork(work){
      this.currentWork = {...work};
    },
    removeWork(work){
      this.works.splice(this.works.indexOf(work), 1);
    },
    cancelEdit(){
      this.currentWork = null;
    },
    saveEdit() {
      this.$validate().then(success => {
        if (success) {
          if (!this.currentWork.id) {
            var formData = new FormData();
            formData.append("title", this.currentWork.title);
            formData.append("techs", this.currentWork.techs);
            formData.append("photo", this.currentWork.photo);
            formData.append("link", this.currentWork.link);
            formData.append("description", this.currentWork.description);

            this.addWork(formData);
          } else {
            var formData = new FormData();
            formData.append("title", this.currentWork.title);
            formData.append("techs", this.currentWork.techs);
            formData.append("photo", this.currentWork.photo);
            formData.append("link", this.currentWork.link);
            formData.append("description", this.currentWork.description);

            this.saveWork({ workId: this.currentWork.id, formData: formData });
          }
          this.currentWork = null;
        }
      });
    },
    addNewWork(){
      this.currentWork = {
          id: null,         
          title: '',
          photo: '',
          link: '',
          desc: '',
          skills: ""
      };
    }
  }
}


</script>

<style lang="postcss">

.works {
  display: flex;
  flex-direction: column;
}

.works__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  .works__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
  }
}

@media screen and (max-width: 600px) {
  .works__list {
    display: grid;
    grid-template-columns: 1fr;
  }
}

.works__item {
  width: 100%;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(black, 0.07);
  &--new {
    background-image: linear-gradient(to right, #006aed, #3f35cb);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }
}

.add-element__pic {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95px;
  height: 95px;
  font-weight: 600;
  color: #ffffff;
  background: transparent;
  border-radius: 50%;
  border: 2px solid white;  
  cursor: pointer;  
  font-size: 72px;
  font-weight: 300;
}

.add-element__text {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  padding-top: 30px;
}

.add-element__text span {
  display: block;
}


.work__info {
  padding: 40px 30px;
  min-height: 200px;
}

.work__title {
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-light;
  margin-bottom: 30px;
}

.work__desc {
  opacity: 0.7;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-light;
  margin-bottom: 30px;
}

.work__link {
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $blue-admin;
  margin-bottom: 45px;
}

.work-icon {
  width: 15px;
  height: 15px;
  fill:#a0a5b1;
}

.button-set--works {
  display: flex;
  justify-content: space-between;
}

.work-editor {
  padding: 30px;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
}

.work-editor-title {
  padding-bottom: 25px;
  padding-left: 10px;
  font-size: 18px;
  font-weight: bold;
}

.work-editor-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  padding-top: 45px;
}

.import-image{
  background-color: #dee4ed;
  background-image: url("data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill: none; stroke: darkgrey; stroke-width: 2; stroke-dasharray: 10 10'/></svg>");
  position: relative;
  width: 100%; 
  display: block;
  padding-top: 56%;    
}

.import-image-wrapper {
  width: 100%;
  padding: 10px;
}

.import-image-content {
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.import-image-text {
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
  line-height: 2.13;
}

.admin-preview-text {
  font-size: 16px;
  font-weight: 600;
  color: $blue-admin;
  text-align: center;
  padding-top: 30px;
}

.work-description {
  padding:10px;
}

.desc-work {
  height:190px;
}

.admin-tags {
  display: flex;
  padding-top: 20px;
}

.work-editor-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 40px;
}

.work-editor-cancel {
  font-weight: 600;
  color: $blue-admin;
  cursor: pointer;
  margin-right: 60px;
}

</style>