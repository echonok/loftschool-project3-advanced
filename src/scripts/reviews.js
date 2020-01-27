import Vue from "vue";
import Flickity from 'vue-flickity';

new Vue({
  el: "#reviews-container",
  template: "#reviews-component",
  components: {
    Flickity
  },
  
  data() {
    return {
      reviews: [],
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        groupCells: 2,
        cellAlign: 'left'
        // any options from Flickity can be used
      }
    }
  },
  
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.makeArrayWithImages(data);
  },

  methods: {
    
    makeArrayWithImages(data) {
      return data.map(elem => {
        const requiredPic = require(`../images/content/reviews/${elem.author_pic}`);
        elem.author_pic = requiredPic;
        return elem;
      });
    },

    next() {
      this.$refs.flickity.next();
    },
    
    previous() {
      this.$refs.flickity.previous();
    }
  }
});