<template lang="pug">
  div(class="indicator__circle-area")
    -var indicatorPower = 50
    -var indicatorText = "new"
    -var persentage = indicatorPower + ` ` + (100 - indicatorPower)
    div(class="indicator__text-area")
      span(class="indicator__text") {{ msg }}
    svg(width="100%" height="100%" viewBox="0 0 42 42" class="indicator__circle")
      linearGradient#circleGradient(x1="0%" y1="0%" x2="0%" y2="100%")
      circle(class="indicator__circle-hole" cx="21" cy="21" r="15.91549430918954" fill="none")
      circle(class="indicator__circle-ring" cx="21" cy="21" r="15.91549430918954" fill="none" stroke="#d2d3d4" stroke-width="3")
      circle(class="indicator__circle-segment" cx="21" cy="21" r="15.91549430918954" fill="none" stroke="#9300e8" stroke-width="5" stroke-dasharray=persentage stroke-dashoffset="50")
</template>

<script>
export default {
  name: 'Indicator',
  data() {
    return {
      msg: 'works!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="pcss" scoped>
@import "../../../styles/mixins.pcss";

.indicator__text-area {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indicator__text {
  opacity: 0.5;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: $text-color;
  z-index: 100;
  max-width: 100px;
  @include tablets {
    font-size: 16px;
  }
}


.indicator__circle-area {
  width: 150px;
  height: 150px;
  position: relative;
  z-index: 50;
  @include phones {
    width: 140px;
    height: 140px;
  }
}

.indicator__circle {
  position: absolute;  
}

.indicator__circle-segment {
  stroke: linear-gradient(to top, $violet1, $violet2);
}
</style>