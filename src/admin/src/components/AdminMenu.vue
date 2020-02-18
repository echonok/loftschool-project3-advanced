<template lang="pug">
.container
  nav.nav
    ul.admin-nav__list
      li.admin-nav__item(
        v-for="item of this.navigateItem"
        @click="$emit('changeContent', item.section)"
        :class="active == item.section ? 'admin-nav__item--active' : ''"
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

.admin-nav__list {
  display: flex;
  align-content: center;
  justify-content: flex-start;
}

.admin-nav__item {
  cursor: pointer;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: $light-grey;
  padding: 30px;
  margin-right: 3.75rem;
  flex-basis: 15%;
  white-space: nowrap;

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