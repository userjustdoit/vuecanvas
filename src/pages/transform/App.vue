<template>
  <div id="app">
    <Transform/>
  </div>
</template>

<script>
import Transform from '@/canvas/Transform'

export default {
  name: 'App',
  components: {
      Transform,
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
