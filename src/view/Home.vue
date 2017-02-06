<template>
    <div>
        <header-bar></header-bar>
        <div class="container has-header">
          <div class="row row-wrap no-padding">
            <div class="col-33-rem" @click="goStage(1)">
              <div class="col-container">第一关</div>
            </div>
            <div class="col-33-rem">
              <div class="col-container">第二关</div>
            </div>
            <div class="col-33-rem">
              <div class="col-container">第三关</div>
            </div>
            <div class="col-33-rem">
              <div class="col-container">第四关</div>
            </div>
            <div class="col-33-rem">
              <div class="col-container">第五关</div>
            </div>
            <div class="col-33-rem">
              <div class="col-container">第六关</div>
            </div>
            <div class="col-33-rem">
              <div class="col-container">第四关</div>
            </div>
            <div class="col-33-rem">
              <div class="col-container">第五关</div>
            </div>
            <div class="col-33-rem">
              <div class="col-container">第六关</div>
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
      mounted () {
        console.log(55)
      },
      methods: {
        goStage (level) {
          this.$router.push({name: 'stage', params: {level}});
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import '~STYLE/mixin.scss';
  @import '~STYLE/components/NineGrid.scss';
</style>
