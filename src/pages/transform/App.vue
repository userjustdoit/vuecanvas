<template>
  <div id="app">
    <Cube3D/>
  </div>
</template>

<script>
import Cube3D from '@/canvas/Cube3D'

export default {
  name: 'App',
  components: {
    Cube3D,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
