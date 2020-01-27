import Vue from "vue";

const projectsTags = {
  template: "#projects-tags",
  props: ["tagsArray"]
};

const projectsInfo = {
  template: "#projects-info",
  computed: {
    tagsArray() {
      return this.currentProject.skills.split(', ');
    }
  },
  components: {
    projectsTags
  },
  props: ["projects", "currentProject"]
};

const projectsPreview = {
  template: "#projects-preview",
  props: ["projects", "currentProject"]
};

const projectsButtons = {
  template: "#projects-buttons",
  props: ["lastUp", "lastDown"]
};

const projectsImage = {
  template: "#projects-image",
  props: ["projects", "currentProject", "lastUp", "lastDown"],
  computed: {
    reversedProjects() {
      return [...this.projects].reverse();
    }
  },
  components: {
    projectsPreview,
    projectsButtons,
    projectsInfo    
  },
};

new Vue({
  el: "#projects-component",
  template: "#projects-container",
  data() {
    return {
      projects: [],
      lastUp: false,
      lastDown: false,
      currentIndex: 0
    }
  },
  computed: {
    currentProject() {
      return this.projects[this.currentIndex];
    }
  },
  components: {
    projectsImage,
    projectsInfo
  },
  methods: {
    makeArrayWithImages(data) {
      return data.map(elem => {
        const requiredPic = require(`../images/content/projects/${elem.id}.jpg`);
        elem.photo = requiredPic;
        return elem;
      });
    },
    handleSlide(direction) {
      switch(direction) {
      case "next":
        this.currentIndex + 1 < this.projects.length ? this.currentIndex++ : this.currentIndex
        break;
      case "prev":
        this.currentIndex > 0 ? this.currentIndex-- : this.currentIndex  
        break;
      }
      this.makeDisabledButtons();
    },
    makeDisabledButtons() {
      this.lastDown = this.currentIndex === 0 
      this.lastUp = this.currentIndex + 1 === this.projects.length
    }
  },
  created() {
    const data = require("../data/projects.json");
    this.projects = this.makeArrayWithImages(data);
    this.makeDisabledButtons();
  }
});