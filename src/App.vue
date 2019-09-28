<template>
  <div id="app">
    <Cube v-for="(cube,index) in cubes" :key="index" :data="cube" :transition="transition" />
    <v-touch
      v-on:swipeleft="swiperleft"
      v-on:swiperight="swiperright"
      v-on:swipeup="swiperup"
      v-on:swipedown="swiperdown"
    >
      <div class="touch-box" ref="touch-box">
        <div class="cell" data-x="-1" data-y="-1"></div>
        <div class="cell" data-x="0" data-y="-1"></div>
        <div class="cell" data-x="1" data-y="-1"></div>
        <div class="cell" data-x="-1" data-y="0"></div>
        <div class="cell" data-x="0" data-y="0"></div>
        <div class="cell" data-x="1" data-y="0"></div>
        <div class="cell" data-x="-1" data-y="1"></div>
        <div class="cell" data-x="0" data-y="1"></div>
        <div class="cell" data-x="1" data-y="1"></div>
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
  data() {
    return {
      cubes: [],
      transition: false
    }
  },
  created() {
    this.init()
  },
  watch: {
    cubes: {
      deep: true,
      handler() {
        console.log('change')
      }
    }
  },
  methods: {
    init() {
      let cubes = []
      let index = 0
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          for (let z = -1; z < 2; z++) {
            let pos = { x, y, z }
            cubes.push({
              index: index++,
              initPos: {
                ...pos,
                left: x == -1 ? 'blue' : 'blue',
                top: y == -1 ? 'yellow' : 'yellow',
                front: z == 1 ? 'red' : 'red',
                right: x == 1 ? 'green' : 'green',
                back: z == -1 ? 'orange' : 'orange',
                bottom: y == 1 ? 'white' : 'white'
              },
              curPos: {
                ...pos,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                left: x == -1 ? 'blue' : 'blue',
                top: y == -1 ? 'yellow' : 'yellow',
                front: z == 1 ? 'red' : 'red',
                right: x == 1 ? 'green' : 'green',
                back: z == -1 ? 'orange' : 'orange',
                bottom: y == 1 ? 'white' : 'white'
              }
            })
          }
        }
      }
      this.cubes = cubes
    },
    run(dir, index, deg) {

      this.transition = true
      let list = this.cubes.forEach(cube => {
        cube.initPos.top = cube.curPos.top
        cube.initPos.right = cube.curPos.right
        cube.initPos.bottom = cube.curPos.bottom
        cube.initPos.left = cube.curPos.left
        cube.initPos.front = cube.curPos.front
        cube.initPos.back = cube.curPos.back
        if (cube.curPos[dir] === index) {
          if (dir === 'y') {
            cube.curPos.rotateY += deg
            if (deg === -90) {
              let temp = cube.curPos.z
              cube.curPos.z = cube.curPos.x
              cube.curPos.x = -temp
            } else {
              let temp = cube.curPos.x
              cube.curPos.x = cube.curPos.z
              cube.curPos.z = -temp
            }
          } else if (dir === 'x') {
            cube.curPos.rotateX += deg
            if (deg === -90) {
              let temp = cube.curPos.y
              cube.curPos.y = cube.curPos.z
              cube.curPos.z = -temp
            } else {
              let temp = cube.curPos.z
              cube.curPos.z = cube.curPos.y
              cube.curPos.y = -temp
            }
          }
          this.resetStyle(cube, dir, deg)
        }
      })

    },
    resetStyle(cube, dir, deg) {
      setTimeout(() => {
        let newCube = this.cubes.find(item => cube.curPos.x === item.initPos.x && cube.curPos.y === item.initPos.y && cube.curPos.z === item.initPos.z)
        this.transition = false
        let { top, right, bottom, left, front, back } = newCube.initPos
        if (dir === 'x' && deg === 90) {
          cube.curPos.top = front
          cube.curPos.bottom = back
          cube.curPos.front = bottom
          cube.curPos.back = top
        } else if (dir === 'x' && deg === -90) {
          cube.curPos.top = back
          cube.curPos.bottom = front
          cube.curPos.front = top
          cube.curPos.back = bottom
        } else if (dir === 'y' && deg === 90) {
          cube.curPos.right = front
          cube.curPos.left = back
          cube.curPos.front = left
          cube.curPos.back = right
        } else if (dir === 'y' && deg === -90) {
          cube.curPos.right = back
          cube.curPos.left = front
          cube.curPos.front = right
          cube.curPos.back = left
        }
        this.$nextTick(() => {
          cube.curPos.x = cube.initPos.x
          cube.curPos.y = cube.initPos.y
          cube.curPos.z = cube.initPos.z
          cube.curPos.rotateX = 0
          cube.curPos.rotateY = 0
          cube.curPos.rotateZ = 0
        })
      }, 800)
    },
    swiperleft(e) {
      let target = e.target.dataset
      this.run('y', parseInt(target.y), -90)
    },
    swiperright(e) {
      let target = e.target.dataset
      this.run('y', parseInt(target.y), 90)
    },
    swiperup(e) {
      let target = e.target.dataset
      this.run('x', parseInt(target.x), 90)
    },
    swiperdown(e) {
      let target = e.target.dataset
      this.run('x', parseInt(target.x), -90)
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
  transform: translate3d(-50%, -50%, 120px);
}
.cell {
  width: 80px;
  height: 80px;
  float: left;
}
</style>
