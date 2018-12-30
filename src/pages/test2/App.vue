<template>
  <div id="app">
    <DelaunayTest/>
  </div>
</template>

<script>
import DelaunayTest from '@/canvas/DelaunayTest'

export default {
  name: 'App',
  components: {
      DelaunayTest
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
  margin-top: 60px;
}
</style>
