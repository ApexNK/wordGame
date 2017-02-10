<template>
    <div>
        <header-bar></header-bar>
        <div class="container has-header">
          <div style="margin: 20px auto; width: 300px; text-align: center">
              APEX 800
          </div>
          
          <div style="margin: 20px auto; width: 100%; text-align: center">
              恭喜你，挑战通过！  
          </div>
          <div style="margin: 20px auto; width: 300px; text-align: center">
              本次游戏中，答错的单词有：
          </div>
          <div class="row row-wrap no-padding">
            <div class="model">
              <div style="padding: 0px 10px; text-align: right">
                  <button type="button" @click="goNormalModel()" class="fr">再来一次</button>
              </div>
            </div>
            <div class="model">
              <div style="padding: 0px 10px">
                  <button type="button" @click="goStrageModel()" class="fl">回到首页</button>
              </div>
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
        goStrageModel () {
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
    width: 80%;
  }
  .model {
    float: left;
    width: 50%;
    clear: both;
  }
</style>
