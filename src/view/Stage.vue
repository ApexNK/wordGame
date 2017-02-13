<template>
    <div>
      <header-bar></header-bar>
        <div class="container has-header" v-show="startGame">
          <div>
            <span class="larger-time">{{gameTime | digitalClock}}</span>
          </div>
          <Scroller>
          <div class="row row-wrap no-padding">
            <div
              :disabled="card.isHidden"
              @click="cardClick(card.id, index)"
              :class="[{'rotateOut': card.isHidden, 'chosen': card.isChosen, 'errchosen': card.isError}, card.styleType]"
              class="col-25-rem animated" v-for="(card, index) in cardList">
              <div class="col-container" style="overflow:auto">{{card.keyword}}</div>
            </div>
        </div>
        </Scroller>
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
    import dataServer from 'PLUGINS/dataServer.js';
    import Scroller from 'components/Scroller.vue';

    const defaultSeconds = 30;
    const totalPairs = 10;
    let listData = [
      {
        'name': 'aberrant',
        'lang': 'en',
        'sequence': 0
      },
      {
        'name': 'abrasive',
        'lang': 'en',
        'sequence': 1
      },
      {
        'name': 'accolade',
        'lang': 'en',
        'sequence': 2
      },
      {
        'name': 'acrimonious',
        'lang': 'en',
        'sequence': 3
      },
      {
        'name': 'address',
        'lang': 'en',
        'sequence': 4
      },
      {
        'name': 'aesthetic',
        'lang': 'en',
        'sequence': 5
      },
      {
        'name': 'aggressor',
        'lang': 'en',
        'sequence': 6
      },
      {
        'name': 'alienate',
        'lang': 'en',
        'sequence': 7
      },
      {
        'name': 'amorphous',
        'lang': 'en',
        'sequence': 8
      },
      {
        'name': 'ample',
        'lang': 'en',
        'sequence': 9
      },
      {
        'name': '侵略者，攻击者',
        'lang': 'zh',
        'sequence': 6
      },
      {
        'name': '充足的',
        'lang': 'zh',
        'sequence': 9
      },
      {
        'name': '发表演说；处理',
        'lang': 'zh',
        'sequence': 4
      },
      {
        'name': '尖刻的',
        'lang': 'zh',
        'sequence': 3
      },
      {
        'name': '异常的，脱轨的',
        'lang': 'zh',
        'sequence': 0
      },
      {
        'name': '无组织的，不定形的',
        'lang': 'zh',
        'sequence': 8
      },
      {
        'name': '离间，使孤立',
        'lang': 'zh',
        'sequence': 7
      },
      {
        'name': '粗糙的，磨损的',
        'lang': 'zh',
        'sequence': 1
      },
      {
        'name': '艺术的，审美的',
        'lang': 'zh',
        'sequence': 5
      },
      {
        'name': '荣誉',
        'lang': 'zh',
        'sequence': 2
      }
    ];

    export default {
      data () {
        return {
          startGame: false,
          time: 3,
          gameTime: defaultSeconds,
          modelName: '欢迎挑战《普通模式》',
          wordList: listData,
          cardList: [],
          startTime: new Date().getTime(),
          wastedTime: 0,
          correctNum: 0,
          isNormal: true,
          timeHandler: null,
          prevSelected: null,
          readyTimer: null
        };
      },
      components: {
        'HeaderBar': HeaderBar,
        Scroller
      },
      mounted () {
        this.getWordList().then(function (data) {
          this.wordList = data;
          this.initListData();
          dataServer.setWordList(this.wordList);
        }.bind(this));
        this.readyGo();
      },
      destroyed () {
        if (this.readyTimer) {
          clearInterval(this.readyTimer);
          this.readyTimer = null;
        }
        if (this.timeHandler) {
          clearInterval(this.timeHandler);
          this.timeHandler = null;
        }
      },
      methods: {
        initListData () {
          let self = this;
          this.isNormal = (this.$route.name === 'normalModel');
          this.modelName = this.isNormal ? '欢迎挑战《普通模式》' : '欢迎挑战《变态模式》';
          let types = ['type1st', 'type2nd', 'type3rd', 'type4th', 'type5th'];
          let allTypes = [];
          if (!this.isNormal) {
            for (let i = 0; i < 4; i++) {
              allTypes = allTypes.concat(types);
            }
            allTypes.sort((o1, o2) => {
              return Math.floor(Math.random() * 10) > 5 ? 1 : -1;
            });
          }
          this.wordList.forEach((item, index) => {
            let card = {
              id: item.id,
              keyword: item.name,
              isHidden: false,
              isChosen: false,
              isError: false
            };
            if (!this.isNormal) {
              card.styleType = allTypes[index];
            }
            self.cardList.push(card);
          });
        },
        getWordList () {
          let startIndex = this.$route.params.startindex;
          let endIndex = this.$route.params.endindex;
          console.info(this.$route.params);
          return this._http.get('wordlist', {startindex: startIndex, endindex: endIndex}).then(function (data) {
            console.info(data);
            let wlist = data.value;
            wlist.sort((o1, o2) => {
              return Math.floor(Math.random() * 10) > 5 ? 1 : -1;
            });
            return wlist;
          });
        },
        cardClick (id, index) {
          let item = this.cardList[index];
          if (item.isHidden) {
            return;
          }
          if (!this.prevSelected) {
            item.isChosen = true;
            this.prevSelected = {
              key: index,
              value: item
            };
            return;
          }

          if (this.prevSelected.key === index) {
            item.isChosen = false;
            this.prevSelected = null;
            return;
          }

          if (id === this.prevSelected.value.id) {
            item.isHidden = true;
            this.prevSelected.value.isHidden = true;
            this.prevSelected = null;
            this.correctNum++;
            console.info('correctNum:' + this.correctNum);
            if (this.correctNum === totalPairs) {
              this.gameTime = 0;
              this.gameOver(true);
            }
            return;
          }
          item.isError = true;
          this.prevSelected.value.isError = true;
          dataServer.setErrorId(id);
          dataServer.setErrorId(this.prevSelected.value.id);
          setTimeout(function () {
            item.isError = false;
            this.prevSelected.value.isError = false;
            this.prevSelected.value.isChosen = false;
            this.prevSelected = null;
          }.bind(this), 400);
          this.$forceUpdate();
        },
        readyGo () {
          this.readyTimer = setInterval(function () {
            if (this.time === 0) {
              clearInterval(this.readyTimer);
              this.readyTimer = null;
              this.startGame = true;
              this.startTimer();
            } else {
              this.time--;
            }
          }.bind(this), 1000);
        },
        gameOver (success) {
          console.info('game over');
          clearInterval(this.timeHandler);
          this.timeHandler = null;
          success ? this.goToSuccessPage() : this.goToFailPage();
        },
        startTimer () {
          this.timeHandler = setInterval(function () {
            if (this.gameTime === 0) {
              this.gameOver(false);
            } else {
              this.gameTime--;
            }
          }.bind(this), 1000);
        },
        goToSuccessPage () {
          this.goToFinishPage(true);
        },
        goToFailPage () {
          this.cardList.forEach((item) => {
            if (!item.isHidden) {
              dataServer.setErrorId(item.id);
            }
          });
          this.goToFinishPage(false);
        },
        goToFinishPage (isSuccessed) {
          let name = this.isNormal ? 'normalModel' : 'strangeModel';
          let startIndex = this.$route.params.startindex;
          let endIndex = this.$route.params.endindex;
          this.$router.replace({name: 'finish', params: {startindex: startIndex, endindex: endIndex, modelname: name, state: (isSuccessed ? 1 : 0)}});
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
  .larger-time {
    font-size: 45px;
    font-weight: 700;
    color: #2f2f2f;
    display: block;
    width: 100%;
    text-align: center;
  }
</style>
