<template>
  <div id="app">
    <!--<HelloWorld/>-->
    <CoolClock/>
  </div>
</template>

<script>
import CoolClock from '@/canvas/CoolClock'

export default {
  name: 'App',
  components: {
    CoolClock,
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
