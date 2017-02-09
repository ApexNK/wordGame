<template>
    <div>
      <header-bar></header-bar>
        <div class="container has-header" v-show="startGame">
          <timer></timer>
          <div class="row row-wrap no-padding">
            <div
              :disabled="card.isHidden"
              @click="cardClick(card.id, index)"
              :class="[{'rotateOut': card.isHidden, 'chosen': card.isChosen, 'errchosen': card.isError}, card.styleType]"
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
    let listData = [
      {
        'name': 'aberrant',
        'sequence': 0
      },
      {
        'name': 'abrasive',
        'sequence': 1
      },
      {
        'name': 'accolade',
        'sequence': 2
      },
      {
        'name': 'acrimonious',
        'sequence': 3
      },
      {
        'name': 'address',
        'sequence': 4
      },
      // {
      //   'name': 'aesthetic',
      //   'sequence': 5
      // },
      // {
      //   'name': 'aggressor',
      //   'sequence': 6
      // },
      // {
      //   'name': 'alienate',
      //   'sequence': 7
      // },
      // {
      //   'name': 'amorphous',
      //   'sequence': 8
      // },
      // {
      //   'name': 'ample',
      //   'sequence': 9
      // },
      // {
      //   'name': '侵略者，攻击者',
      //   'sequence': 6
      // },
      // {
      //   'name': '充足的',
      //   'sequence': 9
      // },
      {
        'name': '发表演说；处理',
        'sequence': 4
      },
      {
        'name': '尖刻的',
        'sequence': 3
      },
      {
        'name': '异常的，脱轨的',
        'sequence': 0
      },
      // {
      //   'name': '无组织的，不定形的',
      //   'sequence': 8
      // },
      // {
      //   'name': '离间，使孤立',
      //   'sequence': 7
      // },
      {
        'name': '粗糙的，磨损的',
        'sequence': 1
      },
      // {
      //   'name': '艺术的，审美的',
      //   'sequence': 5
      // },
      {
        'name': '荣誉',
        'sequence': 2
      }
    ];

    export default {
      data () {
        return {
          startGame: false,
          time: 3,
          modelName: '普通模式',
          wordList: listData,
          cardList: [],
          startTime: new Date().getTime(),
          wastedTime: 0
        };
      },
      components: {
        'HeaderBar': HeaderBar,
        Timer
      },
      mounted () {
        // this.cardList = this.createCardList(this.wordList);
        this.initListData();
        this.globalEvBus.$on('gametimeout', function () {
          this.gameOver();
        }.bind(this));
        this.readyGo();
      },
      methods: {
        initListData () {
          let self = this;
          let isNormal = (this.$route.name === 'normalModel');
          let types = ['type1st', 'type2nd', 'type3rd', 'type4th', 'type5th'];
          let allTypes = [];
          if (!isNormal) {
            for (let i = 0; i < 2; i++) {
              allTypes = allTypes.concat(types);
            }
            allTypes.sort((o1, o2) => {
              return Math.floor(Math.random() * 10) > 5 ? 1 : -1;
            });
          }
          this.wordList.forEach((item, index) => {
            let card = {
              id: item.sequence,
              keyword: item.name,
              isHidden: false,
              isChosen: false,
              isError: false
            };
            if (!isNormal) {
              card.styleType = allTypes[index];
            }
            self.cardList.push(card);
          });
        },
        createCardList (list) {
          let cardList = [];
          list.forEach(item => {
            cardList.push(
              {
                id: item.id,
                keyword: item.en,
                isHidden: false,
                isChosen: false,
                // isError: false,
                styleType: 'type1st'
              }
            );
            cardList.push(
              {
                id: item.id,
                keyword: item.ch,
                isHidden: false,
                isChosen: false,
                // isError: false,
                styleType: 'type2nd'
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
          this.$forceUpdate();
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
