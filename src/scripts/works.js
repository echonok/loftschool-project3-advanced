import Vue from "vue";
import axios from './../requests';

const worksTags = {
  template: "#works-tags",
  props: ["tagsArray"]
};

const worksInfo = {
  template: "#works-info",
  computed: {
    tagsArray() {
      //console.log(this.currentWork);
      //console.log(this.currentWork.title);
      return [];
      return this.currentWork.techs.split(',');
    }
  },
  components: {
    worksTags
  },
  props: ["currentWork"]
};

const worksPreview = {
  template: "#works-preview",
  props: ["works", "currentWork"]
};

const worksButtons = {
  template: "#works-buttons",
  props: ["lastUp", "lastDown"]
};

const worksImage = {
  template: "#works-image",
  props: ["works", "currentWork", "lastUp", "lastDown"],
  computed: {
    reversedWorks() {
      return [...this.works].reverse();
    }
  },
  components: {
    worksPreview,
    worksButtons,
    worksInfo    
  },
};

new Vue({
  el: "#works-component",
  template: "#works-container",
  data() {
    return {
      works: [],
      lastUp: false,
      lastDown: false,
      currentIndex: 0
    }
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    }
  },
  components: {
    worksImage,
    worksInfo
  },
  methods: {
    makeArrayWithImages(data) {
      return data.map(elem => {
        const requiredPic = require(`../images/content/works/${elem.id}.jpg`);
        elem.photo = requiredPic;
        return elem;
      });
    },
    handleSlide(direction) {
      switch(direction) {
      case "next":
        this.currentIndex + 1 < this.works.length ? this.currentIndex++ : this.currentIndex
        break;
      case "prev":
        this.currentIndex > 0 ? this.currentIndex-- : this.currentIndex  
        break;
      }
      this.makeDisabledButtons();
    },
    makeDisabledButtons() {
      this.lastDown = this.currentIndex === 0 
      this.lastUp = this.currentIndex + 1 === this.works.length
    }
  },
  async created() {
    await axios.get('/works/269')
    .then(Response => {
      const data = Response.data;
      //this.works = this.makeArrayWithImages(data);
      this.works = data;
      this.makeDisabledButtons();
    })
    .catch(error => {
      console.log(error.Response);
    });
  },
});