<template>
  <div id="app">
    <!--<HelloWorld/>-->
    <LowPoly/>
  </div>
</template>

<script>
import LowPoly from '@/canvas/LowPoly'

export default {
  name: 'App',
  components: {
    LowPoly,
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
