<template lang="pug">
.container
  nav.nav
    ul.nav__list
      li.nav__item(
        v-for="item of this.navigateItem"
        @click="$emit('changeContent', item.section)"
        :class="active == item.section ? 'nav__item--active' : ''"
        )
        a(class=`navigate__link`) {{item.title}}
</template>

<script>
export default {
  name: 'adminMenu',
  props: ['active'],
  data() {
    return{
      navigateItem: [
        {
          section:'about',
          title:'Обо мне'
        },
        {
          section:'works',
          title:'Работы'
        },
        {
          section:'reviews',
          title:'Отзывы'
        }
      ]
    }
  }
}
</script>
<style lang="postcss">


.admin-section {
  width: 100%;
  padding: 0 2%;
}

.nav {
  grid-area: nav;
  z-index: 50;
}

.nav__list {
  display: flex;
  align-content: center;
}

.nav__item {
  cursor: pointer;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: $light-grey;
  padding: 30px;

  &--active {
    font-weight: 600;
    border-bottom: 3px solid $blue-admin;
    color: $blue-admin;
  }
  &:hover {
    font-weight: 600;
  }
}

</style>