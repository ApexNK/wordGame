<template>
    <div>
        <header-bar></header-bar>
        <div class="container has-header">
          <div style="margin: 20px auto; width: 300px; text-align: center">
              Barron 800
          </div>
          <div style="margin: 40px auto; width: 85%; text-align: center">
              <Ranger style="width: 100%;" v-on:change="change" :min="1" :max="80" :startdefault='1' :enddefault='20'> </Ranger>
              <!--<range-slider  class="slider" min="1" :max="80" step="1" v-model="sliderValue"></range-slider>-->
          </div>
          <div class="row row-wrap no-padding">
            <div class="model">
              <div style="padding: 0px 10px; text-align: right">
                  <button type="button" @click="goNormalModel()" class="fr model-btn">普通模式</button>
              </div>
            </div>
            <div class="model">
              <div style="padding: 0px 10px">
                  <button type="button" @click="goStrageModel()" class="fl model-btn">变态模式</button>
              </div>
            </div>
             <div style="margin: 20px;padding: 20px 10px;">
              <p>普通模式：真的很普通...</p>
              <p>变态模式：时间很宽裕，要利用好不同颜色的提示作用</p>
             </div>
          </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from 'components/Header.vue';
    import Ranger from 'components/Ranger.vue';
    import RangeSlider from 'vue-range-slider';
    import 'vue-range-slider/dist/vue-range-slider.css';

    export default {
      components: {
        'HeaderBar': HeaderBar,
        'RangeSlider': RangeSlider,
        Ranger
      },
      data: function () {
        return {
          val: 1,
          sliderValue: 1,
          startIndex: 1,
          endIndex: 80
        }
      },
      mounted () {
        console.log(55)
      },
      methods: {
        goNormalModel () {
          this.goToNextPage('normalModel');
        },
        goStrageModel () {
          this.goToNextPage('strangeModel');
        },
        goToNextPage (pageName) {
          let start = this.startIndex;
          let end = this.endIndex;
          start = start || 1;
          start = end > 80 ? 80 : start;
          end = end > 80 ? 80 : end;
          this.$router.push({name: pageName, params: {startindex: start, endindex: end}});
        },
        change (val) {
          this.startIndex = val.start || this.startIndex;
          this.endIndex = val.end || this.endIndex;
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import '~STYLE/mixin.scss';
  @import '~STYLE/components/NineGrid.scss';
  .slider {
  /* overwrite slider styles */
    width: 80%;
  }
  .model {
    float: left;
    width: 50%;
    clear: both;
  }
  .model-btn {
    width: 80px;
    height: 30px;
  }
</style>
