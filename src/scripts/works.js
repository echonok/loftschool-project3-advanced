import Vue from "vue";
import axios from './../requests';

const worksTags = {
  template: "#works-tags",
  props: ["tagsArray"]
};

const worksInfo = {
  template: "#works-info",
  props: ["currentWork", "works"],
  computed: {
    tagsArray() {
      if (Object.keys(this.currentWork).length === 0 && this.currentWork.constructor === Object) {
        return [];
      }      
      return this.currentWork.techs.split(','); // тут ошибка
    }
  },
  components: {
    worksTags
  }
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
      currentWork: {},
      currentIndex: 0
    }
  },
  components: {
    worksImage,
    worksInfo
  },
  methods: {
    handleSlide(direction) {
      switch(direction) {      
      case "next":
        if (this.works.indexOf(this.currentWork) + 1 < this.works.length) {
          this.currentWork = this.works[this.works.indexOf(this.currentWork) + 1];
        }
        break;
      case "prev":
        if (this.works.indexOf(this.currentWork) > 0) {
          this.currentWork = this.works[this.works.indexOf(this.currentWork) - 1];
        }
        break;
      }
      this.makeDisabledButtons();
    },
    makeDisabledButtons() {
      this.lastDown = this.currentIndex === 0 
      this.lastUp = this.currentIndex + 1 === this.works.length
    },
    allLoaded() {
      return false;
    }
  },

  async created() {
    await axios.get('/works/269')
    .then(Response => {
      const data = Response.data;
      //this.works = this.makeArrayWithImages(data);
      this.works = data;
      this.currentWork = this.works[0];
      this.makeDisabledButtons();
    })
    .catch(error => {
      console.log(error.Response);
    });
  },
});