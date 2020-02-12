<template lang="pug">
.container
  .about-wrapper
    .title
      .title-text 
        span Блок «Обо мне»
      .add-button(
        @click="addNewSkillGroup"
      )
        .plus_wrapper
          plus
        .button-text
          span Добавить группу
    .fields            
      skillsGroup.item(
        v-for="item in categories"
        :defaultCategory="item"
        :key="item.id"
      )
</template>
<script>

import skillsGroup from "./skillsGroup"
import plus from "./plus"
export default {
  components: { skillsGroup, plus },
  name: 'about',
  data() {
    return {
      skillGroups: [],
      categories: []
    };
  },
    methods:{
    addNewSkillGroup(){
      this.categories.unshift({
          category: '',
          skills: []
        })
    }
  },
  beforeMount(){
    //this.$axios.get('/categories/' + this.$user.id)
    this.$axios.get('/categories/269')
    .then(Response => {
      this.categories = Response.data;
    })
    .catch(error => {
      console.log(error.Response);
    });
  }
}
</script>

<style lang="postcss">

.title{
  display: flex;
  align-items: center;
  padding: 30px 0;
}

.add-button{
  display: flex;
  margin-left: 60px;
  align-items: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  &:hover{
    border-bottom: 2px solid #383bcf;
  }
}

.plus_wrapper{
  width: 21px;
  height: 21px;
  font-size: 15px;
}

.title-text{
  font-size: 21px;
  font-weight: bold;
}

.button-text{
  font-size: 16px;
  font-weight: 600;
  padding-left: 15px;
  color: #383bcf;
}

.fields{
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
}

.fields__item{
  box-shadow: 4.1px 2.9px 20px 0 rgba(0, 0, 0, 0.07);
}

@media screen and (max-width: 768px) {
  .fields{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
  }
}

@media screen and (max-width: 600px) {
  .fields{
    display: grid;
    grid-template-columns: 1fr;
  }
}

</style>