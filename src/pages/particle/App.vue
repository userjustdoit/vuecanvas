<template>
  <div id="app">
    <ParticleClock/>
  </div>
</template>

<script>
import ParticleClock from '@/canvas/ParticleClock'

export default {
  name: 'App',
  components: {
    ParticleClock,
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
