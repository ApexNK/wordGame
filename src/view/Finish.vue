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
                  <button type="button" @click="tryAgain()" class="fr">再来一次</button>
              </div>
            </div>
            <div class="model">
              <div style="padding: 0px 10px">
                  <button type="button" @click="goHomePage()" class="fl">回到首页</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from 'components/Header.vue';

    export default {
      components: {
        'HeaderBar': HeaderBar
      },
      data: function () {
        return {
          ErrorList: []
        }
      },
      mounted () {
        console.log('finished');
      },
      methods: {
        tryAgain () {
          let level = this.$route.params.level;
          let pagename = this.$route.params.modelname;
          this.$router.push({name: pagename, params: {level}});
        },
        goHomePage () {
          let level = this.sliderValue;
          this.$router.push({name: 'home'});
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import '~STYLE/mixin.scss';
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
