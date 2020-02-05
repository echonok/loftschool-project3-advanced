<template lang="pug">
.test
  .test-login
    form(@submit.prevent="login")
      input(type="text" placeholder="login" v-model="user.name")
      input(type="password" placeholder="password" v-model="user.password")
      input(type="submit")
  .test-category
    form(@submit.prevent="createCategory")
      input(type="text" placeholder="category" v-model="category.title")
      input(type="submit")
</template>

<script>
import axios from 'axios';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0OSwiaXNzIjoiaHR0cDovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vbG9naW4iLCJpYXQiOjE1ODA3NDg3NjgsImV4cCI6MTU4MDc2Njc2OCwibmJmIjoxNTgwNzQ4NzY4LCJqdGkiOiJ6QWc4UnJSZnhTUnlWdVBIIn0.ePV4tBJY3tcl-ApGHsZYXOkWMxqFxn8VRpDsiHcrJlk";

axios.defaults.baseURL = 'https://webdev-api.loftschool.com';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  name: 'login',
  data() {
    return {
      token: "",
      category: {
        title: ""
      },
      user: {
        name: "",
        password: "",
        id: ""
      },
      categories: []
    };
  },
  created() {
    this.takeCategories();
  },
  methods: {
    login() {
      console.log(this.user);
      axios.post('/login', this.user).then(response => {
        this.token = response.data;
        console.log(response.data);
      }).catch(error => {
        console.log(error.response.data);
      });
    },
    createCategory() {
      axios.post('/categories', {
        title: this.category.title
      }).then(response => {
        console.log(response.data);        
      }).catch(error => {
        console.log(error.response.data);
      });
    },
    takeCategories() {
      axios.get('/user');
      //axios.get(`/categories`)
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>