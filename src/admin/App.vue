<template lang="pug">
  .wrapper.admin-wrapper      
    header.header
      .user
        .user__avatar Картинка
        .user__name Николай Еловский
      .header__title Панель администрирования
      a.exit Выйти
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
                .skill
                  .field__name
                  .field__skills
                    ul.skills__list
                  .fields__new-skill.new-skill
                    .new-skill__name
                    .new-skill__power
                    button.button-add

              li.fields__item(v-for="field in skills")
                .field
                  .field__name {{ field.skillsGroup }}
                  .field__skills
                    ul.skills__list
                      li.skills__item(v-for="(skillPower, skillName) in field.skills")
                        .skill
                          .skills__name {{skillName}}
                          .skills__power {{skillPower}}
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
  grid-template-rows: 
    200px 1fr;
  grid-gap:
    20px 10px;
  grid-template-areas: 
    "header"
    "content";
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
}

.section {
  width: 100%;
}

.nav__list {
  display: flex;
  min-height: 100px;
  align-content: center;
}

.nav__item {
  cursor: pointer;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: $light-grey;
  padding: 10px;  

  &--active {
    font-weight: 600;
    border-bottom: 2px solid $blue-hover;
    color: $blue-hover;
  }
  &:hover {
    font-weight: 600;
  }
}

.headline {
  display: flex;
}

.headline__text {
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.67;
  letter-spacing: normal;
  text-align: left;
  color: $links-color;
}

.fields {
  display: flex;
  padding: 10px 10px;
}

.fields__list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  background-color: white;
  &--new {

  }
}


.fields__item {
  //flex: 1 1 20px;
  min-width: 45%;
  background-color: aqua;
  //margin-right: 20px;
  margin-bottom: 20px;
}

.skill {
  display: flex;
}

</style>