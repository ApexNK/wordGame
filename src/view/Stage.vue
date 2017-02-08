<template>
    <div>
      <header-bar></header-bar>
        <div class="container has-header" v-show="startGame">
          <timer></timer>
          <div class="row row-wrap no-padding">
            <div
              :disabled="card.isHidden"
              @click="cardClick(card.id, index)"
              :class="{'rotateOut': card.isHidden, 'chosen': card.isChosen, 'errchosen': card.isError}"
              class="col-33-rem animated" v-for="(card, index) in cardList">
              <div class="col-container">{{card.keyword}}</div>
            </div>
        </div>
      </div>
      <div class="container has-header" v-show="!startGame">
          <div style="width:80%; border: 1px sienna solid; height: 300px; margin: 50px auto; position: relative;" class="text-center">
              <div class="title">
                  {{modelName}}
              </div>
              <div>
                游戏马上开始，准备好了吗？
              </div>
              <div class="timezone">
                  <span class="time">{{time}}</span>
              </div>
          </div>
      </div>
</template>

<script>
    import HeaderBar from 'components/Header.vue';
    import Timer from 'components/Timer.vue';

    let prevSelected = null;

    export default {
      data () {
        return {
          startGame: false,
          time: 3,
          modelName: '普通模式',
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
        this.globalEvBus.$on('gametimeout', function () {
          this.gameOver();
        }.bind(this));
        this.readyGo();
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
                isChosen: false,
                isError: false
              }
            );
            cardList.push(
              {
                id: item.id,
                keyword: item.ch,
                isHidden: false,
                isChosen: false,
                isError: false
              }
            );
          });
          cardList.sort((o1, o2) => {
            return Math.floor(Math.random() * 10) > 5 ? 1 : -1;
          });
          return cardList;
        },
        cardClick (id, index) {
          let item = this.cardList[index];
          if (item.isHidden) {
            return;
          }

          if (!prevSelected) {
            item.isChosen = true;
            prevSelected = {
              key: index,
              value: item
            };
            return;
          }

          if (prevSelected.key === index) {
            item.isChosen = false;
            prevSelected = null;
            return;
          }

          if (id === prevSelected.value.id) {
            item.isHidden = true;
            prevSelected.value.isHidden = true;
            prevSelected = null;
            return;
          }

          item.isError = true;
          prevSelected.value.isError = true;
          setTimeout(function () {
            item.isError = false;
            prevSelected.value.isError = false;
            prevSelected.value.isChosen = false;
            prevSelected = null;
          }, 400);
          // if (this.choseId === -1) {
          //   this.choseId = id;
          //   this.setChosen(index);
          //   return;
          // }
          // if (this.chosens.indexOf(index) >= 0) {
          //   return;
          // }
          // if (id === this.choseId) {
          //   this.setChosen(index);
          //   this.setHidden(this.chosens);
          //   this.chosens.length = 0;
          //   return;
          // }
          // this.chosens[0] = index;
          // this.choseId = id;
          // this.cardList.forEach((item, idx) => {
          //   item.isChosen = idx === index;
          // });
          // this.errCount++;
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
        },
        readyGo () {
          let clock = setInterval(function () {
            if (this.time === 0) {
              clearInterval(clock);
              this.startGame = true;
              this.globalEvBus.$emit('startTimer');
            } else {
              this.time--;
            }
          }.bind(this), 1000);
        },
        gameOver () {
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import '~STYLE/mixin.scss';
  @import '~STYLE/components/NineGrid.scss';
  @import '~STYLE/common.scss';
  .hidden {
    opacity: 0;
  }
  .title {
    font-size: 1.4em;
    margin: 20px auto;
  }
  .timezone {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    margin-top: -50px;
    margin-left: -50px;
  }
  .time {
    font-size: 70px;
    font-weight: 400;
    color: #2f2f2f;
    display: block;
    width: 100%;
    text-align: center;
  }
</style>
