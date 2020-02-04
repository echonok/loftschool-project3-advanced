<template lang="pug">
.container
  .admin-section.projects-section
    .headline
      .headline__text Блок «Работы»
    .projects
      
      .project-editor(
        v-if="currentProject != null"
      )
        .project-editor-title 
          .project-editor-title-text Редактирование работы
        hr
        .project-editor-body
          .import-image-wrapper 
            .admin-preview(
              v-if="currentProject.photo"
            )
              img.admin-edit-image-img(                 
                :src="this.$importImg(`projects/${currentProject.photo}`)"
              )
              .admin-preview-text  Изменить превью
            .import-image(
                v-if="!currentProject.photo"
              )
              .import-image-content
                .import-image-text
                  span Перетащите или загрузите
                  br
                  span для загрузки изображения
                .load-button-wrapper
                  load-button(
                    text="ЗАГРУЗИТЬ"
                  )
          .project-description
            admin-input.name-project(
              :labelText="'Название'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'name-project'"
              :type="'input'"
              :val="currentProject.title"
              @change="titleChange"
            )

            admin-input.link-project(
              :labelText="'Ссылка'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'link-project'"
              :type="'input'"
              :val="currentProject.link"
              @change="linkChange"
            )

            admin-input.desc-project(
              :labelText="'Описание'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'desc-project'"
              :type="'textarea'"
              :val="currentProject.desc"
              @change="descChange"
            )

            admin-input.tags-project(
              :labelText="'Добавление тэга'"
              :isInvalid="false"
              :toolTipText="'toolTipText'"
              :id="'tags-project'"
              :type="'input'"
              :val="currentProject.skills"
              @change="tagsChange"
            )
            .admin-tags
              tags.edit-tag(
                :tags="currentProject.skills"
                :edit="true"
                @removeTag="removeTag"
              )
        .project-editor-buttons
          .project-editor-cancel(
            @click="cancelEdit"
          ) Отмена
          .project-editor-save(
            @click="saveEdit"
          )
            load-button(
              text="СОХРАНИТЬ"
            )

      ul.projects__list
        li.projects__item.projects__item--new(
          @click="addNewProject"
        )
          .add-element__pic
            span +
          .add-element__text 
            span Добавить работу
        project(
          v-for="(project, index) in projects"
          :project="project"
          :selected="currentProject && project.id == currentProject.id"
          @selectProject="selectProject"
          @removeProject="removeProject"
          :key="index"
        )

</template>

<script>
import project from './Project';
import loadButton from './LoadButton';
import adminInput from './AdminInput';
import tags from './Tags';
export default {
  name: 'projects',
  components: { project, loadButton, adminInput, tags },
  data() {
    return {
      currentProject: null,
      projects: []
    };
  },
  created() {
    this.projects = require("../../../data/projects.json");
  },
  computed: {
    tagsArray() {
      return this.currentProject.skills.split(', ');
    }
  },
  methods:{
    removeTag(val){
      let tags = [...this.currentProject.skills]
      tags.forEach((element, i) => {
        if(element == val){
          tags.splice(i, 1);
        }
      this.currentProject.skills = tags;
      });
    },
    titleChange(value){
      this.currentProject.title = value;
    },
    linkChange(value){
      this.currentProject.link = value;
    },
    descChange(value){
      this.currentProject.desc = value;
    },
    tagsChange(value){
      this.currentProject.skills = value.split(', ');
    },
    selectProject(project){
      this.currentProject = {...project};
    },
    removeProject(project){
      this.projects.splice(this.projects.indexOf(project), 1);
    },
    cancelEdit(){
      this.currentProject = null;
    },
    saveEdit(){
      if(!this.currentProject.id){
        this.currentProject.id = this.projects[this.projects.length - 1].id + 1;
        this.projects.push(this.currentProject);
      }
      else{
        let tmp = this.projects.find(f => f.id == this.currentProject.id); 
        this.projects[this.projects.indexOf(tmp)] = this.currentProject;
      }
      this.currentProject = null;
    },
    addNewProject(){
      this.currentProject = {
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

.project-editor {
  padding: 30px;
  background-color: white;
  box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
}

.project-editor-title {
  padding-bottom: 25px;
  padding-left: 10px;
  font-size: 18px;
  font-weight: bold;
}

.project-editor-body {
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

.project-description {
  padding:10px;
}

.desc-project {
  height:190px;
}

.admin-tags {
  display: flex;
  padding-top: 20px;
}

.project-editor-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 40px;
}

.project-editor-cancel {
  font-weight: 600;
  color: $blue-admin;
  cursor: pointer;
  margin-right: 60px;
}

</style>