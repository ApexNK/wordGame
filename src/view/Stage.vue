<template>
    <div>
        <header-bar></header-bar>
        <div class="container has-header">
          <timer></timer>
          <div>
            第{{$route.params.level}}关 错误{{errCount}}
          </div>
          <div class="row row-wrap no-padding">
            <div
              :disabled="card.isHidden"
              @click="cardClick(card.id, index)"
              :class="{'rotateOut': card.isHidden, 'chosen': card.isChosen}"
              class="col-33-rem animated" v-for="(card, index) in cardList">
              <div class="col-container">{{card.keyword}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from 'components/Header.vue';
    import Timer from 'components/Timer.vue';

    export default {
      data () {
        return {
          wordList: [
            {
              id: 0,
              en: 'halo',
              ch: '你好'
            },
            {
              id: 1,
              en: 'good morning',
              ch: '早上好'
            },
            {
              id: 2,
              en: 'name',
              ch: '名字'
            },
            {
              id: 3,
              en: 'football',
              ch: '足球'
            },
            {
              id: 4,
              en: 'basketball',
              ch: '篮球'
            },
            {
              id: 5,
              en: 'park',
              ch: '公园'
            }
          ],
          cardList: [],
          errCount: 0,
          choseId: -1,
          correctCount: 0,
          clicks: 0,
          chosens: [],
          startTime: new Date().getTime(),
          wastedTime: 0
        };
      },
      components: {
        'HeaderBar': HeaderBar,
        Timer
      },
      mounted () {
        this.cardList = this.createCardList(this.wordList);
        // this.globalEvBus.$on('gametimeout', function () {
        // }.bind(this));
        this.globalEvBus.$emit('startTimer');
      },
      methods: {
        createCardList (list) {
          let cardList = [];
          list.forEach(item => {
            cardList.push(
              {
                id: item.id,
                keyword: item.en,
                isHidden: false,
                isChosen: false
              }
            );
            cardList.push(
              {
                id: item.id,
                keyword: item.ch,
                isHidden: false,
                isChosen: false
              }
            );
          });
          cardList.sort((o1, o2) => {
            return Math.floor(Math.random() * 10) > 5 ? 1 : -1;
          });
          return cardList;
        },
        cardClick (id, index) {
          if (this.cardList[index].isHidden) {
            return;
          }
          if (this.choseId === -1) {
            this.choseId = id;
            this.setChosen(index);
            return;
          }
          if (this.chosens.indexOf(index) >= 0) {
            return;
          }
          if (id === this.choseId) {
            this.setChosen(index);
            this.setHidden(this.chosens);
            this.chosens.length = 0;
            return;
          }
          this.chosens[0] = index;
          this.choseId = id;
          this.cardList.forEach((item, idx) => {
            item.isChosen = idx === index;
          });
          this.errCount++;
        },
        setChosen (index) {
          this.cardList[index].isChosen = true;
          this.chosens.push(index);
        },
        setHidden (chosens) {
          chosens.forEach(item => {
            this.cardList[item].isHidden = true;
          });
          this.choseId = -1;
          this.correctCount ++;
          if (this.correctCount === this.wordList.length) {
            window.alert('过关!');
          }
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import '~STYLE/mixin.scss';
  @import '~STYLE/components/NineGrid.scss';
  .hidden {
    opacity: 0;
  }
  
</style>
