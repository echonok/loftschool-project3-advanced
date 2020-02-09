<template lang="pug">
  header.header-admin
    .container
      .header-wrapper
        .avatar
          img.avatar-img(:src="this.$importImg('user.jpg')")
        .header-text  
          .name Николай Еловский
          .title Панель администратора
          .logout Выйти
</template>

<script>
import login from './login';
export default {
  components: { login },
  name: 'admin-header',
}

</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";
.header-admin{
  background-color: $blue-dark;
  color: #ffffff;
}

.header-wrapper{
  height: 80px;
  display: flex;
  justify-items: center;
}

.avatar{
  margin: auto 0;
}
.avatar-img{
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.header-text{
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
}

.name{
  font-size: 18px;
  font-weight: 600;
  line-height: 1.89;
}

.title{
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  opacity: 0.5;
  padding-left: 28px;
}

.logout{
  opacity: 0.7;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-decoration: underline;
  margin-left:auto;
}
</style>