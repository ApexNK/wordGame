<template>
    <div class="ranger-box">
        <div class="progress-bar" :style="style"></div>
        <div :style="{left: style.left}" style="position:absolute;height:20px; width:20px;margin-top:15px">{{vals.start}}</div>
        <div :style="{right: style.right}" style="position:absolute;height: 20px; width:20px;margin-top:15px">{{vals.end}}</div>
        <span v-drag-x="ondrag1" :data-min="dragMin" :data-start="startVal/max*100" class="pointer"></span>
        <span v-drag-x="ondrag2" :data-min="dragMin" :data-start="startVal/max*100" class="pointer"></span>
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
          width: 0}
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
        this.dragMin = this.min / this.max * 100;
      },
      computed: {
        style () {
          return {
            left: `${(Math.min(this.val1, this.val2)) / this.width * 100}%`,
            right: `${((this.width - Math.max(this.val1, this.val2))) / this.width * 100}%`
          };
        },
        vals () {
          return {
            start: Math.ceil(Math.min((this.val1 || this.min), this.val2) / this.width * this.max),
            end: Math.ceil(Math.max(this.val1, this.val2) / this.width * this.max)
          };
        }
      },
      methods: {
        ondrag1 (x) {
          this.val1 = x;
          this.emitVal();
        },
        ondrag2 (x) {
          this.val2 = x;
          this.emitVal();
        },
        emitVal () {
          let self = this;
          this.$emit('change', {
            start: self.vals.start,
            end: self.vals.end
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
