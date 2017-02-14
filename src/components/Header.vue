<template>
    <div class="header-bar row">
        <!--<a class="button" @click="backClick">
            返回
        </a>-->
        <h4 class="col text-center title">
            {{title}}
        </h4>
        <!--<a class="button"></a>-->
    </div>
</template>
<script>
    export default {
      props: {
        title: {
          type: String,
          default: 'APEXSAT800高频单词 连连看'
        }
      },
      created () {

      },
      methods: {
        backClick () {
          this.$router.go(-1);
        }
      }
    }
</script>
<style  lang="scss" scoped>
    @import '~STYLE/flex.scss';
    @import '~STYLE/common.scss';
    @import '~STYLE/mixin.scss';
    .header-bar {
        position: fixed;
        left: 0;
        right: 0;
        line-height: 44px;
        @include setShadow();
    }
    .title {
            line-height: 44px;
        }
    .button {
            display: inline-block;
            color: #ccc;
            width: 60px;
            text-align: center;
            line-height: 44px;
        }
</style>