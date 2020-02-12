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
  import adminHeader from "./src/components/adminHeader"
  import adminMenu from "./src/components/adminMenu"
  import about from "./src/components/about"
  import works from "./src/components/works"
  import reviews from "./src/components/reviews"
  import plus from "./src/components/plus"
  export default {
    data(){
      return{
        activeContent: 'about'
      }
    },
    components: {'admin-header':adminHeader, 'admin-menu': adminMenu, about, works, reviews, plus },
    created() {
      this.skillsGroup = require("../data/skills.json");
      this.works = require("../data/works.json");
      this.reviews = require("../data/reviews.json");    
    },
    methods:{
      changeContent(content){
        this.activeContent = content;
      }
    }

  };
</script>

<style lang="postcss">

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";

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
    grid-area: header;
  }

  .maincontent {
    grid-area: maincontent;
    display: grid;
    grid-template-columns: 
      1fr;
    grid-auto-rows:
      minmax(min-content, max-content);
    grid-template-areas: 
      "nav"
      "content";
  }  

  .content{
    position: relative;
    background: 
  }
  .content-background{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: -1;
  }

  .background-img{
    object-fit: cover;
    width: 100%;
    opacity: 0.1;
  }

body {
  height: 100vh;
  font-family: 'Open Sans', Helvetica, sans-serif;
  line-height: 1.42;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;

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

</style>