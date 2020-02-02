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
        img.background-img(:src="this.$importImg('baloonAdmin.jpg')")
      about(
        v-if="activeContent == 'about'"
      )
      Projects(
        v-if="activeContent == 'projects'"
      )
      Reviews(
        v-if="activeContent == 'reviews'"
      )

</template>

<script>
  import AdminHeader from "./src/components/AdminHeader"
  import AdminMenu from "./src/components/AdminMenu"
  import about from "./src/components/about"
  import Projects from "./src/components/Projects"
  import Reviews from "./src/components/Reviews"
  export default {
    data(){
      return{
        activeContent: 'about'
      }
    },
    components: {'admin-header':AdminHeader, 'admin-menu': AdminMenu, about, Projects , Reviews },
    created() {
      this.skills = require("../data/skills.json");
      this.projects = require("../data/projects.json");
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