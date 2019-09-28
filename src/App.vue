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
  methods: {
    init() {
      let cubes = []
      let cubesObj = {}
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          for (let z = -1; z < 2; z++) {
            let pos = {
              x, y, z,
              left: x == -1 ? 'blue' : 'black',
              top: y == -1 ? 'yellow' : 'black',
              front: z == 1 ? 'red' : 'black',
              right: x == 1 ? 'green' : 'black',
              back: z == -1 ? 'orange' : 'black',
              bottom: y == 1 ? 'white' : 'black'
            }
            let data = {
              init: {
                ...pos,
              },
              cur: {
                ...pos,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0
              }
            }
            cubes.push(data)
          }
        }
      }
      this.cubes = cubes
    },
    run(dir, index, deg) {
      if (this.transition) return
      this.transition = true
      let list = this.cubes.forEach(cube => {
        cube.init.top = cube.cur.top
        cube.init.right = cube.cur.right
        cube.init.bottom = cube.cur.bottom
        cube.init.left = cube.cur.left
        cube.init.front = cube.cur.front
        cube.init.back = cube.cur.back
        if (cube.cur[dir] === index) {
          if (dir === 'y') {
            cube.cur.rotateY += deg
            if (deg === -90) {
              let temp = cube.cur.z
              cube.cur.z = cube.cur.x
              cube.cur.x = -temp
            } else {
              let temp = cube.cur.x
              cube.cur.x = cube.cur.z
              cube.cur.z = -temp
            }
          } else if (dir === 'x') {
            cube.cur.rotateX += deg
            if (deg === -90) {
              let temp = cube.cur.y
              cube.cur.y = cube.cur.z
              cube.cur.z = -temp
            } else {
              let temp = cube.cur.z
              cube.cur.z = cube.cur.y
              cube.cur.y = -temp
            }
          }
          this.$nextTick(() => {
            this.resetStyle(cube, dir, deg)
          })
        }
      })
    },
    resetStyle(cube, dir, deg) {
      let sourceCube = this.cubes.find(item => cube.init.x === item.cur.x && cube.init.y === item.cur.y && cube.init.z === item.cur.z)
      let { top, right, bottom, left, front, back } = sourceCube.init
      setTimeout(() => {
        this.transition = false
        if (dir === 'x') {
          if (cube.cur.x === -1) {
            cube.cur.left = left
          } else if (cube.cur.x === 1) {
            cube.cur.right = right
          }
          if (deg === 90) {
            cube.cur.top = front
            cube.cur.bottom = back
            cube.cur.front = bottom
            cube.cur.back = top
          } else if (deg === -90) {
            cube.cur.top = back
            cube.cur.bottom = front
            cube.cur.front = top
            cube.cur.back = bottom
          }
        } else if (dir === 'y') {
          if (cube.cur.y === -1) {
            cube.cur.top = top
          } else if (cube.cur.y === 1) {
            cube.cur.bottom = bottom
          }
          if (deg === 90) {
            cube.cur.right = front
            cube.cur.left = back
            cube.cur.front = left
            cube.cur.back = right
          } else if (deg === -90) {
            cube.cur.right = back
            cube.cur.left = front
            cube.cur.front = right
            cube.cur.back = left
          }
        }
        this.$nextTick(() => {
          cube.cur.x = cube.init.x
          cube.cur.y = cube.init.y
          cube.cur.z = cube.init.z
          cube.cur.rotateX = 0
          cube.cur.rotateY = 0
          cube.cur.rotateZ = 0
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
