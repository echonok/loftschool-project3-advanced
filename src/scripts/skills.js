import Vue from "vue";

const skillItem = {
  template: "#skill-item",
  props: ["skillPower", "skillName"],
  methods: {
    drawArea() {
      const circle = this.$refs["color-area"];
      const percent = `${this.skillPower} ${100 - this.skillPower}`;
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
  props: ["field"]
};

new Vue({
  el: "#skill-component",
  template: "#skills-stack",
  data() {
    return {
      skills: []
    }
  },
  components: {
    skillsField
  },
  created() {
    const data = require("../data/skills.json");
    this.skills = data;
  }
});