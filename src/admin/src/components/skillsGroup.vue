<template lang="pug">
  .skillGroup
    .group-title
      .group-title-input(:class="editTitle ? 'input-edited' : '' ")
        input.skill-group-name-input(
          placeholder="Название новой группы"
          :readOnly="editTitleComputed ? false : true"
          v-model="categoryTitleValue"
          ref="skillGroupName"
          )
        .input-tooltip(:class="{'showed':validation.hasError('categoryTitleValue')}") {{validation.firstError('categoryTitleValue')}}  
      .button-set
        .edit-buttons(
          v-if="editTitleComputed"
        )
          .apply(
            @click="editSkillGroupName"
          )
            svg.skill-icon
              use(:xlink:href="this.$importSvg('tick')")  
          .cancel(
            @click="removeCategory(category)"
          )
            svg.skill-icon
              use(:xlink:href="this.$importSvg('cross')")  
            
        .edit(
            @click="editTitle = !editTitle"
            v-if="!editTitleComputed"
          )
            svg.skill-icon
              use(:xlink:href="this.$importSvg('pencil')")  
    hr.spliter
    .group-body
      skill(
        v-for="(item, i) in category.skills"
        :skill="item"
        :key="`${item.name}_${i}`"
        :iterator="i"
        )
    .add-skill
      .new-skill
        input.skill-name-input(
          placeholder="Новый навык"
          ref="newSkillName"
          )
      .new-count
        input.skill-count-input(
          :value="100"
          ref="newSkillCount"
        )
        .percent %
      .plus-wrapper(
        @click="addSkill"
      )
        plus
</template>

<script>
import SimpleVueValidator from "simple-vue-validator";
import { mapActions } from "vuex";
const Validator = SimpleVueValidator.Validator;

import skill from './skills';
import plus from './plus';

export default {
  mixins: [SimpleVueValidator.mixin],
  components: { skill, plus },
  name: 'skillsGroup',
  props: {
    category: Object
  },
  data() {
    return {
      editTitle: false,
      categoryTitleValue: this.category.category,
      showNewSkillError: false
    };
  },
  computed: {
    editTitleComputed() {
      return this.editTitle || this.category.category.length === 0;
    }
  },
  validators: {
    categoryTitleValue(value) {
      return Validator.value(value).required("Поле не должно быть пустым");
    }
  },
  methods: {
    ...mapActions("about", [
      "removeCategory",
      "addCategory",
      "renameCategory",
      "addSkillAction"
    ]),
    editSkillGroupName() {
      this.$validate().then(success => {
        if (success) {
          if (!this.category.id) {
            this.addCategory({ title: this.$refs.skillGroupName.value });
          } else {
            this.renameCategory({
              category: this.category,
              title: this.$refs.skillGroupName.value
            });
          }
          this.editTitle = false;
        }
      });
    },
    addSkill() {
      if (this.$refs.newSkillName.value != "") {
        this.addSkillAction({
          title: this.$refs.newSkillName.value,
          percent: this.$refs.newSkillCount.value,
          category: this.category.id
        });
        this.$refs.newSkillName.value = "";
        this.$refs.newSkillCount.value = 100;
        this.showNewSkillError = false;
      } else {
        this.showNewSkillError = true;
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.skillGroup{
  position: relative;
  padding:20px;
  background-color: white;
}
.group-title{
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}

.group-title-input{
  
  width: 60%;  
}
  .input-edited{
    border-bottom: 1px solid;
}

.button-set{
  display: flex;
  align-items: center;
}
.skill-group-name-input{
  background-color: transparent;
  border-color: transparent;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.89;
}
.edit-buttons{
  display: flex;
  align-items: center;
}
.edit{
  padding-right: 22px;
  cursor: pointer;
}

.skill-icon{
  width: 15px;
  height: 15px;
  fill:#a0a5b1;
}

.spliter{
  opacity: 0.15;
}

.group-body{
  padding-bottom: 140px;
}

.apply{
  color: #00d70a;
  font-size: 20px;
  font-weight: 900;
  padding-right: 20px;
  line-height: 0.5;
  cursor: pointer;
}
.cancel{
  color: #bf2929;
  font-size: 30px;
  font-weight: 900;
  line-height: 0.5;
  padding-right: 10px;
  cursor: pointer;
}
.add-skill{
  position: absolute;
  right: 31px;
  bottom: 31px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* padding-top: 70px; */
}

.new-skill{
  display: flex;
  margin-right: 10px;
  width:45%;
  justify-content: flex-end;
  height: 100%;
  border-bottom: 1px solid;
}
.skill-name-input,
.skill-count-input{
  width:100%;
}

.new-count{
  display: flex;
  width: 55px;
  height: 100%;
  margin-right: 30px;
  border-bottom: 1px solid;
}
.skill-name-input,
.skill-count-input,
.percent{
  font-size: 16px;
  font-weight: 600;
  color: #a0a5b1;
  background-color: transparent;
  border-color: transparent;
  line-height: 2;
}

.plus-wrapper{
  width: 40px;
  height: 40px;
  font-size: 30px;
  font-weight: 600; 
}
</style>