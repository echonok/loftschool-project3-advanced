<template lang="pug">
.wrapper.admin-wrapper
  admin-header
  .maincontent
    admin-menu(
      :active = "activeContent"
      @changeContent="changeContent"
    )
    .content
      .content-background
        img.background-img(:src="this.$importImg('Mountain_Baloon.jpg')")
      about(
        v-if="activeContent == 'about'"
      )
      works(
        v-if="activeContent == 'works'"
      )
      reviews(
        v-if="activeContent == 'reviews'"
      )

</template>

<script>
  import adminHeader from "./adminHeader";
  import adminMenu from "./adminMenu";
  import about from "./about";
  import works from "./works";
  import reviews from "./reviews";
  import plus from "./plus";

  export default {
    name: 'maincontent',
    data(){
      return{
        activeContent: 'about',
        authorized: false
      }
    },
    components: {'admin-header':adminHeader, 'admin-menu': adminMenu, about, works, reviews, plus },
    created() {
      this.skills = require("../../../data/skills.json");
      this.works = require("../../../data/works.json");
      this.reviews = require("../../../data/reviews.json");    
    },
    methods:{
      changeContent(content){
        this.activeContent = content;
      }
    }

  };
</script>

<style lang="postcss">


</style>