<template>
  <div id="app">
    <Cube
      v-for="(cube,index) in cubes"
      :key="index"
      :data="cube"
    />
    <v-touch 
      v-on:swipeleft="swiperleft"
      v-on:swiperight="swiperright"
      v-on:swipeup="swiperup"
      v-on:swipedown="swiperdown"
      >
    <div class="touch-box" ref='touch-box'>
      <div class="cell" data-x='-1' data-y='-1'></div>
      <div class="cell" data-x='0' data-y='-1'></div>
      <div class="cell" data-x='1' data-y='-1'></div>
      <div class="cell" data-x='-1' data-y='0'></div>
      <div class="cell" data-x='0' data-y='0'></div>
      <div class="cell" data-x='1' data-y='0'></div>
      <div class="cell" data-x='-1' data-y='1'></div>
      <div class="cell" data-x='0' data-y='1'></div>
      <div class="cell" data-x='1' data-y='1'></div>
    </div>
    </v-touch>
  </div>
</template>

<script>
import Cube from './components/Cube'
export default {
  name: 'app',
  components: {
    Cube
  },
  data(){
    return {
      cubes:[]
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      let cubes = []
      for(let x = -1 ; x < 2 ; x ++) {
        for(let y = -1 ; y < 2 ; y ++) {
          for(let z = -1 ; z < 2; z ++) {
            let pos = {x,y,z}
            cubes.push({
              initPos: pos,
              curPos: {
                ...pos,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0
              }
            })
          }
        }
      }
      this.cubes = cubes
    },
    run(dir,index,deg){
      let list = this.cubes.filter(cube => {
        if (cube.curPos[dir] === index) {
          console.log(cube.curPos.x + ',' + cube.curPos.y + ',' + cube.curPos.z)
          if(dir === 'y'){
            cube.curPos.rotateY += deg
            if(deg === -90) {
              let temp = cube.curPos.z
              cube.curPos.z = cube.curPos.x
              cube.curPos.x = -temp
            }else{
              let temp = cube.curPos.x
              cube.curPos.x = cube.curPos.z
              cube.curPos.z = -temp
            }
          }else if(dir === 'x') {
            cube.curPos.rotateX += deg
            if(deg === -90) {
              let temp = cube.curPos.y
              cube.curPos.y = cube.curPos.z
              cube.curPos.z = -temp
            }else {
              let temp = cube.curPos.z
              cube.curPos.z = cube.curPos.y
              cube.curPos.y = -temp
            }
          }
          console.log(cube.curPos.x + ',' + cube.curPos.y + ',' + cube.curPos.z)

        }
      })
    },
    swiperleft(e){
      let target = e.target.dataset
      this.run('y',parseInt(target.y), -90)
    },
    swiperright(e){
      let target = e.target.dataset
      this.run('y',parseInt(target.y),90)
    },
    swiperup(e){
      let target = e.target.dataset
      this.run('x',parseInt(target.x),90)
    },
    swiperdown(e){
      let target = e.target.dataset
      this.run('x',parseInt(target.x),-90)
    }
  }
}
</script>

<style>
#app {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 2000px;
  perspective-origin: -200px -200px;
}
.touch-box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 240px;
  height: 240px;
  transform: translate3d(-50%,-50%,120px);
  background: rgba(0,0,0,.3);
}
.cell {
  width: 80px;
  height: 80px;
  float: left;
}
</style>
