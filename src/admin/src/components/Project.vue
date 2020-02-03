<template lang="pug">
li.projects__item
  .project
    .project__pic-area
      .project__pic {{project.photo}}
        
      ul.project__tags.tags__list
        tags(          
          :tags="project.skills"
        )
    .project__info
      .project__title {{ project.title }}
      .project__desc {{ project.desc }}
      a.project__link(:href="project.link") {{ project.link }}
      .button-set--projects
        .edit Править
        .remove Удалить

</template>

<script>
import tags from './tags'
export default {
  name: 'project',
  components: { tags },
  props:{
    project: Object,
    selected: Boolean
  }
}
</script>

<style lang="postcss">
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