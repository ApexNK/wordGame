<template>
    <div>
        <span class="time">{{time | digitalClock}}</span>
    </div>
</template>
<script>
    let clock = null;
    const defaultSeconds = 30;

    export default {
    //   props: {
    //     title: {
    //       type: String,
    //       default: '单词连连看'
    //     }
    //   },
      data () {
        return {
          time: defaultSeconds
        }
      },
      created () {
        this.globalEvBus.$on('startTimer', function () {
          this.start();
        }.bind(this));
      },
      mounted () {

      },
      methods: {
        start: function () {
          clock = setInterval(() => {
            if (this.time === 0) {
              this.pause();
            } else {
              this.time--;
            }
          }, 1000);
        },
        pause: function () {
          clearInterval(clock);
          this.globalEvBus.$emit('gametimeout');
        },
        reset: function () {
          this.pause();
          this.time = defaultSeconds;
        }
      }
    }
</script>
<style  lang="scss" scoped>
  .time {
    font-size: 45px;
    font-weight: 700;
    color: #2f2f2f;
    display: block;
    width: 100%;
    text-align: center;
  }
</style>