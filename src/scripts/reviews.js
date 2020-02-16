import Vue from "vue";
import Flickity from 'vue-flickity';
import axios from './../requests';

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
      }
    }
  },
  
  /*
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.makeArrayWithImages(data);
    this.handleResize();
  },
  */

  
  async created(){
    await axios.get('/reviews/269')
    .then(Response => {
      this.reviews = Response.data;
      this.handleResize();
    })
    .catch(error => {
      console.log(error.Response);
    });
  },
  
  mounted() {
    this.$refs.flickity.rerender();
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
    },

    handleResize() {
      

      if (window.innerWidth <= 320) {
        this.flickityOptions.groupCells = 1;
      }
    }

  }
});