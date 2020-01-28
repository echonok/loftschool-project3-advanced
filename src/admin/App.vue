<template lang="pug">
  .wrapper.admin-wrapper      
    mixin icon(name, className)
      - var icon = require(`../images/icons/${name}.svg`);
      svg(class=className viewBox=icon.viewBox preserveAspectRatio="none")
        use(xlink:href=icon.url)

    header.header
      .user
        .user__avatar
          img(src='../images/content/user.jpg' class='user__avatar-pic')
        .user__name Николай Еловский
          +icon("Cross", "test__icon")
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
            button.projects__add-element Добавить работу
            ul.projects__list
              li.projects__area Проект 1



        .admin-section.reviews-section
          .headline
            .headline__text Блок "Отзывы"            
          .reviews
            button.reviews__add-element Добавить отзыв
            ul.reviews__list
              li.reviews__area Ревью 1

</template>

<script>
export default {
  data() {
    return {
      skills: [],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    };
  },
  components: {},
  created() {
    const data = require("../data/skills.json");
    this.skills = data;
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
  height: 100%;
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
  height: 100%;
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
  min-width: 45%;
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



</style>