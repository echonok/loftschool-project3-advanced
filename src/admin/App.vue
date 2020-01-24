<template lang="pug">
  div.superclass
    Indicator
    Indicator2
</template>

<script>
import Indicator from './src/components/Indicator'
import Indicator2 from './src/components/Indicator2'

export default {
  data() {
    return {
      // Переменная, которую мы объявляем в шаблоне
      text:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    };
  },
  components: {
    Indicator,
    Indicator2,
  }
};
</script>