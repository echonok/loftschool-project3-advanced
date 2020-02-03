<template lang="pug">
.container
  .admin-section.projects-section
    
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

    .headline
      .headline__text Блок «Работы»
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
                svg.project-icon
                  use(:xlink:href="this.$importSvg('cross')")

              .editor-button.editor-button--save Сохранить
                svg.project-icon
                  use(:xlink:href="this.$importSvg('tick')")


      ul.projects__list
        li.projects__item.projects__item--new
          .add-element__pic
            span +
          .add-element__text 
            span Добавить работу
        project(
          v-for="(project, index) in projects"
          :project="project"
          :key="`project_${project.id}`"
        )

</template>

<script>
import project from './Project'
export default {
  name: 'projects',
  components: { project },
  data() {
    return {
      currentProject: null,
      projects: []
    };
  },
  created() {
    this.projects = require("../../../data/projects.json");
  }
}


</script>

<style lang="postcss">

.projects {
  display: flex;
  flex-direction: column;
}

.projects__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  .projects__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
  }
}

@media screen and (max-width: 600px) {
  .projects__list {
    display: grid;
    grid-template-columns: 1fr;
  }
}

.projects__item {
  width: 100%;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(black, 0.07);
  margin-bottom: 30px;
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
  line-height: 1;
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
  line-height: 1.67;
  text-align: center;
  color: #ffffff;
  padding-top: 30px;
}

.add-element__text span {
  display: block;
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

.project-icon {
  width: 15px;
  height: 15px;
  fill:#a0a5b1;
}

.button-set--projects {
  display: flex;
  justify-content: space-between;
}

</style>