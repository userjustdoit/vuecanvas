<template>
  <div id="app">
    <NetParticle2/>
  </div>
</template>

<script>
import NetParticle2 from '@/canvas/NetParticle2'

export default {
  name: 'App',
  components: {
      NetParticle2,
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
