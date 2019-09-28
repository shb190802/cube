<template>
  <div class="cube" :style="style" :class="{transition}">
    <div class="surface front" :style="{background:data.curPos['front']}"></div>
    <div class="surface right" :style="{background:data.curPos['right']}"></div>
    <div class="surface back" :style="{background:data.curPos['back']}"></div>
    <div class="surface left" :style="{background:data.curPos['left']}"></div>
    <div class="surface top" :style="{background:data.curPos['top']}"></div>
    <div class="surface bottom" :style="{background:data.curPos['bottom']}"></div>
  </div>
</template>
<script>
export default {
  name:"Cube",
  props: {
    data: {
      type: Object,
      default(){
        return {
          initPos: {},
          curPos: {}
        }
      }
    },
    transition:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      surface: ['front','right','back','left','top','bottom'],
      baseSize: 80
    }
  },
  computed:{
    style(){
      return `
      transform: rotateX(${this.data.curPos.rotateX}deg) rotateY(${this.data.curPos.rotateY}deg) rotateZ(${this.data.curPos.rotateZ}deg) translate3d(${this.data.initPos.x * this.baseSize}px, ${this.data.initPos.y * this.baseSize}px,${this.data.initPos.z * this.baseSize}px)`
    }
  }
}
</script>
<style>
.cube{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
}
.cube.transition {
  transition: 800ms;
}
.surface {
  position: absolute;
  left: -40px;
  top: -40px;
  width: 80px;
  height: 80px;
  background: #000;
  border: 1px solid #000;
  border-radius: 10px;
  box-sizing: border-box;
}
.front {
  transform: translateZ(40px);
}
.right {
  transform: rotateY(90deg) translateZ(40px);
}
.back {
  transform: rotateY(180deg) translateZ(40px);
}
.left {
  transform: rotateY(270deg) translateZ(40px);
}
.top {
  transform: rotateX(90deg) translateZ(40px);
}
.bottom {
  transform: rotateX(270deg) translateZ(40px);
}
</style>