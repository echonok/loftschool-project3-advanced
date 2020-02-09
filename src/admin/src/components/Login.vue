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
  .get-category
    form(@submit.prevent="takeCategories")
      input(type="submit" name="user")
</template>

<script>
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;

import imputValidate from './inputValidate'

import axios from 'axios';
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI0OSwiaXNzIjoiaHR0cDovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vbG9naW4iLCJpYXQiOjE1ODA3NDg3NjgsImV4cCI6MTU4MDc2Njc2OCwibmJmIjoxNTgwNzQ4NzY4LCJqdGkiOiJ6QWc4UnJSZnhTUnlWdVBIIn0.ePV4tBJY3tcl-ApGHsZYXOkWMxqFxn8VRpDsiHcrJlk";
axios.defaults.baseURL = 'https://webdev-api.loftschool.com';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
  components: {'inputValidate': imputValidate},
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
      //console.log(this.user);
      axios.post('/login', this.user).then(response => {

        localStorage.setItem('token', response.data.token);
        this.$token = response.data.token;
        this.$axios.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
        this.$user = this.user;
        //this.$router.push({name:'home'});

        //this.token = response.data;
        //console.log('response.data', response.data);
      }).catch(error => {
        console.log('error.response.data', error.response.data);
      });
    },
    createCategory() {
      axios.post('/categories', {
        title: this.category.title
      }).then(response => {
        //console.log(response.data);        
      }).catch(error => {
        console.log(error.response.data);
      });
    },
    takeCategories() {
      axios.get('/user').then(response => {
        //console.log(response.data);
      }).catch(errpr => {
        console.log(response.data);
      });
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>