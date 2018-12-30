<template>
  <div id="app">
    <!--<HelloWorld/>-->
    <Clip/>
  </div>
</template>

<script>
import Clip from '@/canvas/Clip'

export default {
  name: 'App',
  components: {
    Clip,
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
