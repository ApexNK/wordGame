<template>
    <div class="header-bar row">
        <!--<a class="button" @click="backClick">
            返回
        </a>-->
        <h4 class="col text-center">{{title}}</h4>
        <a class="button" @click="share()"><i class="icon-share"></i></div>
        <!--<a class="button"></a>-->
    </div>
</template>
<script>
    import soshm from 'soshm';

    export default {
      props: {
        title: {
          type: String,
          default: 'APEX召唤授 连连看'
        }
      },
      created () {

      },
      methods: {
        backClick () {
          this.$router.go(-1);
        },
        share () {
          soshm.popIn({
            title: 'APEX召唤授 连连看',
            url: 'http://www.newsater.org/apex/',
            pic: 'http://www.newsater.org/apex/static/img/apexLogo.jpg',
            sites: ['weixin', 'weixintimeline', 'weibo', 'yixin', 'qzone', 'tqq', 'qq']
          });
        }
      }
    }
</script>
<style  lang="scss" scoped>
    @import '~STYLE/flex.scss';
    @import '~STYLE/common.scss';
    .header-bar {
        position: fixed;
        left: 0;
        right: 0;
        line-height: 44px;
        background: #000;
        color: #fff;
    }
    .header-bar h4 {
        font-size: 16px;
        font-weight: normal;
    }
    .header-bar .button {
        position: absolute;
        right: 10px;
    }
</style>