<template lang="pug">
  .wrapper.admin-wrapper      
    mixin icon(name, className)
      - var icon = require(`../images/icons/${name}.svg`);
      svg(class=className viewBox=icon.viewBox preserveAspectRatio="none")
        use(xlink:href=icon.url)

    mixin addField(nameClassName, nameValue, valueClassName, placeholderValue)
      label.field__label
        span(class=nameClassName)&attributes(attributes)= nameValue
      div.field__box        
        input(class=valueClassName type='text' placeholder=placeholderValue required)

    mixin addTextArea(nameClassName, nameValue, valueClassName, placeholderValue)
      label.field__label
        span(class=nameClassName)&attributes(attributes)= nameValue
      div.field__box        
        textarea(class=valueClassName type='text' placeholder=placeholderValue required)

    header.header
      .user
        .user__avatar
          img(src='../images/content/user.jpg' class='user__avatar-pic')
        .user__name Николай Еловский
          
        .header__title Панель администрирования
      a.header__exit(href="#") Выйти
    .maincontent
      
      nav.nav
        .nav__list
          .nav__item.nav__item--active Обо мне
          .nav__item Работы
          .nav__item Отзывы

      .sections-list

        .admin-section.about-section
          .headline
            .headline__text Блок "Обо мне"
            button.headline__add-element.headline__add-element--small Добавить группу
          .fields            
            ul.fields__list
              
              li.fields__item.fields__item--new
                .field
                  .field__header
                    input.field__name(placeholder="Название новой группы")
                    .field__name-ico
                  .field__skills
                    ul.skills__list
                  .fields__new-skill.new-skill
                    .new-skill__name
                    .new-skill__power
                    button.button-add

              li.fields__item(v-for="field in skills")
                .field
                  input(class="field__name" :value="field.skillsGroup")
                  .field__skills
                    ul.skills__list
                      li.skills__item(v-for="(skillPower, skillName) in field.skills")
                        .skill
                          input(class="skills__name" :value="skillName")
                          span.skillpower-wrapper
                            input(class="skills__power" :value="skillPower")
                          .skills__icons
                  .fields__new-skill.new-skill
                    .new-skill__name
                    .new-skill__power
                    button.button-add

        
        
        .admin-section.projects-section
          .headline
            .headline__text Блок "Работы"              
          .projects
            
            .project-editor.editor
              .project-editor__headline Редактирование работы
              .project-editor__content
                .project-editor__pic-box
                  .project-editor__pic-area
                    .project-editor__pic
                    .editor-button.editor-button--save Загрузить
                  .project-editor__pic-desc Добавить фото
                form.project-editor__form
                  +addField('project__field', 'Название', 'field__value', 'Введите название')
                  +addField('project__field', 'Ссылка', 'field__value', 'Введите ссылку')
                  +addTextArea('project__field', 'Описание', 'textarea__value', 'Введите Описание')
                  +addField('project__field', 'Добавление тега', 'field__value', 'Теги через запятую')
                  .editor-buttons
                    .editor-button.editor-button--cancel Отмена
                    .editor-button.editor-button--save Сохранить


            ul.projects__list
              li.projects__item.projects__area--new
                a.add-element
                  .add-element__pic +
                  .add-element__text Добавить работу
              li.projects__item(v-for="project in projects")
                .project
                  .project__pic-area
                    .project__pic {{project.photo}}
                    ul.project__tags.tags__list
                      li.tags__item.tag(v-for="tag in project.tags")
                       .tag__text {{tag}}
                  .project__info
                    .project__title {{project.title}}
                    .project__desc {{project.desc}}
                    a.project__link {{project.link}}
                    .tools
                      a.tools__edit
                        .btn__pic-area
                          .btn__pic
                        .btn__title Править
                      a.tools__del
                        .btn__pic-area
                          .btn__pic
                        .btn__title Удалить



        .admin-section.reviews-section
          .headline
            .headline__text Блок "Отзывы"            
          
          .review-editor.editor
            .review-editor__headline Новый отзыв
            .review-editor__content
              .review-editor__pic-box
                .review-editor__pic-area
                  .review-editor__pic
                .review-editor__pic-desc Добавить фото
              form.review-editor__form
                +addField('reviev__field', 'Имя автора', 'field__value', 'Введите имя', 'text')
                +addField('reviev__field', 'Титул автора', 'field__value', 'Введите титул', 'text')
                +addTextArea('reviev__field', 'Отзыв', 'textarea__value', 'Введите отзыв', 'textarea')
                .editor-buttons
                  .editor-button.editor-button--cancel Отмена
                  .editor-button.editor-button--save Сохранить
          


          .reviews
            ul.reviews__list
              li.reviews__item.reviews__item--new
                a.add-element
                  .add-element__pic +
                  .add-element__text Добавить отзыв
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
  data() {
    return {
      skills: [],
      projects: [],
      reviews: []
    };
  },
  components: {},
  created() {
    this.skills = require("../data/skills.json");
    this.projects = require("../data/projects.json");
    this.reviews = require("../data/reviews.json");
  }
};
</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";

body {
  height: 100vh;
  font-family: 'Open Sans', Helvetica, sans-serif;
  line-height: 1.42;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;

}

.wrapper {
  display: grid;
  grid-template-columns: 
    1fr;
  grid-auto-rows:
    minmax(min-content, max-content);
  grid-template-areas: 
    "header"
    "maincontent";
}

.header {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-white;
  background-color: $blue-dark;
  display: flex;
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1% 2%;
}

.header__title {
  opacity: 0.5;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-white;
}

.header__exit {
  cursor: pointer;
  opacity: 0.7;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-white;
}

.user {
  display: flex;
  align-items: center;
}

.user__avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  @include tablets {
    width: 30px;
    height: 30px;
  }
}

.user__avatar-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;  
}

.user__name {
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
  margin-right: 30px;
}

.maincontent {
  grid-area: maincontent;
  //height: 100%;
  display: grid;
  grid-template-columns: 
    1fr;
  grid-auto-rows:
    minmax(min-content, max-content);
  grid-template-areas: 
    "nav"
    "content";
}

.admin-section {
  width: 100%;
  padding: 0 2%;
}

.nav {
  grid-area: nav;
  padding: 0 2%;
  z-index: 50;
}

.nav__list {
  display: flex;
  align-content: center;
}

.nav__item {
  cursor: pointer;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: $light-grey;
  padding: 30px;

  &--active {
    font-weight: 600;
    border-bottom: 3px solid $blue-admin;
    color: $blue-admin;
  }
  &:hover {
    font-weight: 600;
  }
}

.sections-list {
  grid-area: content;
}

.headline {
  display: flex;
  padding: 60px 0;
}

.headline__text {
  font-size: 21px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-light;
}

.about-section {
  background: linear-gradient(0deg, rgba($text-color-white, 0.9), rgba($text-color-white, 0.9)), url('~images/content/Mountain_Baloon.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.fields {
  display: flex;
}

.fields__list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  &--new {

  }
}

.fields__item {
  //flex: 1 1 20px;
  width: calc(90% / 2);
  background-color: white;
  //margin-right: 20px;
  margin-bottom: 20px;
  color: $text-color-light;
  box-shadow: 4.1px 2.9px 20px 0 rgba(black, 0.07);
}

.field {
  padding: 30px 20px;
}

.field__name {
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-light;
  &::placeholder {
    opacity: 0.51;
  }
}

.skill {
  display: flex;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-light;
  padding: 10px 0;
  justify-content: space-between;
}

.skills__name {
  border: none;
  outline: none;
  margin-right: 20px;
  &--active {
    border-bottom: 1px solid black;
  }
  &:focus {
    border-bottom: 1px solid $blue-admin;
  }
}

.skillpower-wrapper {
  margin-right: 50px;
  max-width: 75px;
  &::after {
    content: "%";
    opacity: 0.7;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: right;
    color: $light-grey;
  }
  &:focus-within {
    border-bottom: 1px solid $blue-admin;
  }
  &--active {
    border-bottom: 1px solid black;
  }
}

.skills__power {
  border: none;
  outline: none;
  width: 50%;
}

.projects-section {
  background: linear-gradient(0deg, rgba($text-color-white, 0.9), rgba($text-color-white, 0.9)), url('~images/content/Mountain_Baloon.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.projects {
  display: flex;
  flex-direction: column;
}

.projects__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.projects__item {
  width: calc((100% / 3) - 60px);
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(black, 0.07);
  margin-bottom: 30px;
}

.project__info {
  padding: 40px 30px;
  min-height: 200px;
}

.project__title {
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-light;
  margin-bottom: 30px;
}

.project__desc {
  opacity: 0.7;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-light;
  margin-bottom: 30px;
}

.project__link {
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $blue-admin;
  margin-bottom: 45px;
}

.tools {
  display: flex;
  justify-content: space-between;
}

.btn__title {
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: $light-grey;
}

.reviews-section {
  background: linear-gradient(0deg, rgba($text-color-white, 0.9), rgba($text-color-white, 0.9)), url('~images/content/Mountain_Baloon.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.reviews {
  display: flex;
  flex-direction: column;
}

.reviews__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.reviews__item {
  width: calc((100% / 3) - 60px);
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(black, 0.07);
  margin-bottom: 30px;
  &--new {
    background-image: linear-gradient(to top, $admin-grad-1, $admin-grad-2);
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

.project-editor {
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

.project-editor__headline {
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

.project-editor__content {
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

.project-editor__pic-box {
  grid-area: left;
}

.project-editor__form {
  grid-area: right;
  width: 100%;
}

.project-editor__pic-desc {
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $blue-admin;
}

.project__field {
  opacity: 0.5;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $light-grey;  
}

.field__label {
  margin-bottom: 20px;
}

.field__box {
  margin-bottom: 30px;
}

.field__value {
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 3;
  letter-spacing: normal;
  text-align: left;
  color: $light-grey;
  border: none;
  outline: none;
  margin-right: 20px;
  border-bottom: 1px solid $light-grey;
  &--active {

  }
  &:focus {
    
  }
}

.textarea__value {
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 3;
  letter-spacing: normal;
  text-align: left;
  color: $light-grey;
  border: none;
  outline: 1px solid rgba($text-color-light, 0.15);
  margin-right: 20px;
  width: 100%;
  &--active {

  }
  &:focus {

  }
}


.editor-buttons {
  display: flex;
}

.editor-button {
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: $text-color-white;
  background-image: linear-gradient(to top, $admin-grad-1, $admin-grad-2);
  padding: 20px 40px;
  border-radius: 45px;
  margin: 10px;
  text-transform: uppercase;
  &--cancel {
    color: $blue-admin;
    background-image: linear-gradient(to top, $text-color-white, $text-color-white);
    text-transform: none;
  }
}

.add-element {
  display: flex;
  flex-direction: column;
}

.add-element__pic {
  font-size: 72px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: $text-color-white;
  border: solid 2px $text-color-white;
  border-radius: 50%;
}

.add-element__text {
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: $text-color-white;
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