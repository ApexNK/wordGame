class DragX {
  constructor (oEle) {
    this.oEle = oEle;
    this.curX = 0;
    this.startX = 0;
    this.lastMoveX = 0;
    this.init();
    this.onDragCallBacks = [];
    this.onDragEndCallBacks = [];
  }
  init () {
    this.oEle.addEventListener('touchstart', this.touchStartCb.bind(this));
  }
  setOffsetX (curX) {
    this.oEle.style.left = `${curX}px`;
  }
  touchStartCb (ev) {
    ev.preventDefault();
    let curTouch = ev.touches[0];
    this.lastMoveX = curTouch.pageX;
    this.startX = this.lastMoveX;
    this.oEle.addEventListener('touchmove', this.touchMoveCb.bind(this));
    this.oEle.addEventListener('touchend', this.touchEndCb.bind(this));
  }
  touchMoveCb (ev) {
    ev.preventDefault();
    let curTouch = ev.touches[0];
    let nowX = curTouch.pageX;
    this.curX += (nowX - this.lastMoveX);
    this.setOffsetX(this.curX);
    this.lastMoveX = nowX;
    this.onDragCallBacks.forEach(fn => fn(this.curX));
  }
  touchEndCb (ev) {
    ev.preventDefault();
    let curTouch = ev.changedTouches[0];
    let nowX = curTouch.pageX;
    this.curX += (nowX - this.lastMoveX);
    this.oEle.removeEventListener('touchmove', this.touchMoveCb.bind(this));
    this.oEle.removeEventListener('touchend', this.touchEndCb.bind(this));
    this.onDragEndCallBacks.forEach(fn => fn(this.curX));
  }
  onDrag (fn) {
    this.onDragCallBacks.push(fn);
  }
  onDragEnd (fn) {
    this.onDragEndCallBacks.push(fn);
  }
}
const dragX = {
  bind () {},
  inserted (el, binding, vnode, oldVnode) {
    let dragEle = new DragX(el);
    debugger;
    console.log(dragEle);
    if (binding.value && typeof binding.value === 'function') {
      debugger;
      dragEle.onDrag(binding.value);
    }
  }
};
export default dragX

