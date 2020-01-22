new Vue({
  el: '#app',
  data: {
    title: 'Hello World!!!',
    href: "//google.com",
    link: "<a href='loftschool.com'>Ссылка</a>",
    coordX: 0
  },
  methods: {
    handleChange(newTitle, event) {
      //this.title = event.target.value;
      this.coordX = event.clientX;
    }
  }
});