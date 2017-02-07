<template>
    <div :id="scrollId"  >
      <div>
        <slot></slot>
        <div :class="'loader'+scrollId " class="text-center spinner-box" v-show="canLoad">
          <Spinner class="spinner"></Spinner>
        </div>
      </div>
    </div>
</template>
<script>
    import { Spinner } from 'mint-ui';
    // import Vue from 'vue';
    // Vue.use(InfiniteScroll);
    // v-infinite-scroll="onInfinited" infinite-scroll-distance="100" infinite-scroll-disabled="canLoad"
    // import {IScrollProbe} from 'STATIC_LIB/IScroll/index.js';
    export default {
      // directives: {InfiniteScroll},
      props: {
        dist: {type: Number, default: 0},
        scrollId: {
          type: String,
          default: `scrollId${Date.now()}${Math.floor(Math.random() * 100)}`
        },
        loadOver: {
          type: Boolean,
          default: true
        }
      },
      computed: {
        canLoad () {
          return !this.loadOver;
        }
      },
      methods: {
        onInfinited () {
          if (this.canLoad) {
            this.$emit('onInfinited');
          }
        },
        scroll () {
          if (this.isInClientView(this.loadEle)) {
            this.onInfinited()
          }
        },
        isInClientView (loaderEle) {
          var clientHeight = document.documentElement.clientHeight;
          var eleRect = loaderEle.getBoundingClientRect();
          return (eleRect.top >= 0 && eleRect.top === clientHeight + this.dist) || (eleRect.bottom >= 0 + this.dist && eleRect.bottom <= clientHeight);
        }
      },
      data () {
        return {
          element: null,
          scroller: null,
          isLoading: false,
          loadEle: null
        }
      },
      mounted () {
        this.loadEle = this.$el.querySelector(`.loader${this.scrollId}`)
        this.$el.style.overflow = 'scroll';
        this.onInfinited();
        this.$el.addEventListener('scroll', this.scroll);
      },
      created () {
      },
      destroyed () {
      },
      components: {
        Spinner
      }
    }
</script>
<style lang="scss" scoped>
  .spinner-box {
    height: 40px;
    // padding:10px;
    line-height: 40px;
    vertical-align: middle;
    .spinner{
      display: inline-block;
      vertical-align: middle;
    }
  }
    
    
    
</style>