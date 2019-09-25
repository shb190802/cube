<template>
  <div class="cube" :style="style">
    <div
      v-for="item in surface"
      :key='item'
      class="surface"
      :class="item"
      ></div>
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
          initPos: {x: 0,y:0,z:0},
          curPos: {x: 0,y:0,z:0,rotateX:0,rotateY:0,rotateZ:0}
        }
      }
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
  transition: 800ms;
}
.surface {
  position: absolute;
  left: -40px;
  top: -40px;
  width: 80px;
  height: 80px;
  background: #F00;
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