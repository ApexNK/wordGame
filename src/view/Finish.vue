<template>
    <div>
        <header-bar></header-bar>
        <div class="container has-header">
          <div style="margin: 20px auto; width: 300px; text-align: center">
              APEX 800
          </div>
          
          <div style="margin: 20px auto; width: 100%; text-align: center">
            {{title}}
          </div>
          <div style="margin: 20px auto; width: 300px; text-align: center;">
              本次游戏中，共答错{{ErrorList.length}}单词
              <ul v-if="ErrorList.length > 0" style="margin: 20px 10px; list-style-type:none" >
                <li v-for="word in ErrorList">
                  {{word.enName}} : {{word.zhName}}
                </li>
              </ul>
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
    import dataServer from 'PLUGINS/dataServer.js';

    export default {
      components: {
        'HeaderBar': HeaderBar
      },
      data: function () {
        return {
          ErrorList: [],
          title: ''
        }
      },
      mounted () {
        console.log('finished');
        if (this.$route.params.state === 1) {
          this.title = ' 恭喜你，挑战通过';
        } else {
          this.title = ' 非常遗憾，挑战失败';
        }
        this.ErrorList = dataServer.getErrorList();
      },
      methods: {
        tryAgain () {
          let start = this.$route.params.startindex;
          let end = this.$route.params.endindex;
          let pagename = this.$route.params.modelname;
          this.$router.replace({name: pagename, params: {startindex: start, endindex: end}});
        },
        goHomePage () {
          this.$router.replace({name: 'home'});
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
