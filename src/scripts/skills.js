import Vue from "vue";
import axios from './../requests'

const skillItem = {
  template: "#skill-item",
  props: ["skill"],
  methods: {
    drawArea() {
      const circle = this.$refs["color-area"];
      const percent = `${this.skill.percent} ${100 - this.skill.percent}`;
      circle.style.strokeDasharray = percent;  
    }
  },
  mounted() {
    this.drawArea();
  }
};

const skillsField = {
  template: "#skills-field",
  components: {
    skillItem
  },
  props: ["category"]
};

new Vue({
  el: "#skill-component",
  template: "#skills-stack",
  data() {
    return {
      categories: []
    }
  },
  components: {
    skillsField
  },
  created(){
    axios.get('/categories/269')
    .then(Response => {
      this.categories = Response.data;
    })
    .catch(error => {
      console.log(error.Response);
    });
  }
});