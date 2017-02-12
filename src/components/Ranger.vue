<template>
    <div class="ranger-box">
        <div class="progress-bar" :style="style"></div>
        <div :style="{left: style.left}" style="position:absolute;height:20px; width:20px;margin-top:15px">{{vals.start}}</div>
        <div :style="{right: style.right}" style="position:absolute;height: 20px; width:20px;margin-top:15px">{{vals.end}}</div>
        <span v-drag-x="ondrag1" class="pointer startPointer"></span>
        <span v-drag-x="ondrag2" class="pointer endPointer"></span>
    </div>
</template>
<script>
    import dragX from 'components/drag.js';
    export default {
      directives: {dragX},
      data () {
        return {
          val1: 0,
          val2: 0,
          width: 0
        }
      },
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
        this.width = this.$el.offsetWidth;
      },
      computed: {
        style () {
          return {
            left: `${(Math.min(this.val1, this.val2) - 10) / this.width * 100}%`,
            right: `${((this.width - Math.max(this.val1, this.val2)) - 10) / this.width * 100}%`
          };
        },
        vals () {
          return {
            start: Math.floor(Math.min(this.val1, this.val2) / this.width * 100),
            end: Math.floor(Math.max(this.val1, this.val2) / this.width * 100)
          };
        }
      },
      methods: {
        ondrag1 (x) {
          this.val1 = x;
          this.minVal = 1;
          this.maxVal = 80;
          this.emitVal();
        },
        ondrag2 (x) {
          this.val2 = x;
          this.minVal = 1;
          this.maxVal = 80;
          this.emitVal();
        },
        emitVal () {
          this.$emit('change', {
            start: Math.floor(Math.min(this.val1, this.val2) / this.width * 100),
            end: Math.floor(Math.max(this.val1, this.val2) / this.width * 100)
          });
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
