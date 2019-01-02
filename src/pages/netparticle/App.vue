<template>
  <div id="app">
    <NetParticle/>
  </div>
</template>

<script>
import NetParticle from '@/canvas/NetParticle'

export default {
  name: 'App',
  components: {
      NetParticle,
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
