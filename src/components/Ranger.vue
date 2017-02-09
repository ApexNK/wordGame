<template>
    <div class="ranger-box">
        <div class="progress-bar"></div>
        <span v-drag-x="ondrag" :min="0" :max="150" class="pointer startPointer"></span>
        <span v-drag-x="ondrag" class="pointer endPointer"></span>
    </div>
</template>
<script>
    import dragX from 'components/drag.js';
    export default {
      directives: {dragX},
      props: {
        min: {
          type: Number,
          default: 0
        },
        max: {
          type: Number,
          default: 100
        },
        startVal: {
          type: Number,
          default: 0
        }
      },
      mounted () {

      },
      methods: {
        ondrag (x) {
          console.log(x);
        }
      }
    }
</script>
<style lang="scss" scoped>
    .ranger-box{
        display: inline-block;
        position: relative;
        min-width: 150px;
        height: 4px;
        border-radius: 2px;
        background: #e2e2e2;
        .progress-bar {
            position: absolute;
            height: 4px;
            border-radius: 2px;
            width: 2%;
            background: #21fb92;
        }
        .pointer {
              display: block;
              position: absolute;
              top: 50%;
              left: 0;
              box-sizing: border-box;
              height: 20px;
              width: 20px;
              border: 1px solid #f5f5f5;
              border-radius: 50%;
              background-color: #fff;
              box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
              -webkit-transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              cursor: pointer;
        }
    }
</style>
