<template>
    <div>
        <header-bar></header-bar>
        <div class="container has-header">
          <div style="margin: 20px auto; width: 300px; text-align: center">
              APEX 800
          </div>
          <div style="margin: 20px auto; width: 100%; text-align: center">
              <range-slider  class="slider" min="1" max="80" step="1" v-model="sliderValue"></range-slider>
          </div>
          <div style="margin: 20px auto; width: 300px; text-align: center">
              选择级别：{{sliderValue}}
          </div>
          <div class="row row-wrap no-padding">
            <div class="model">
              <div style="padding: 0px 10px; text-align: right">
                  <button type="button" @click="goNormalModel()" class="fr">普通模式</button>
              </div>
            </div>
            <div class="model">
              <div style="padding: 0px 10px">
                  <button type="button" @click="goStrageModel()" class="fl">变态模式</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from 'components/Header.vue';
    import RangeSlider from 'vue-range-slider';
    import 'vue-range-slider/dist/vue-range-slider.css';

    export default {
      components: {
        'HeaderBar': HeaderBar,
        'RangeSlider': RangeSlider
      },
      data: function () {
        return {
          val: 1,
          step: 2,
          scale: [0, 90, 200],
          sliderValue: 1
        }
      },
      mounted () {
        console.log(55)
      },
      methods: {
        goNormalModel () {
          let level = this.sliderValue;
          this.$router.push({name: 'normalModel', params: {level}});
        },
        gostrangeModel () {
          let level = this.sliderValue;
          this.$router.push({name: 'strangeModel', params: {level}});
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import '~STYLE/mixin.scss';
  @import '~STYLE/components/NineGrid.scss';
  .slider { 
  /* overwrite slider styles */
  min-width: 250px;
  }
  .model {
    float: left;
    width: 50%;
    clear: both;
  }
</style>
