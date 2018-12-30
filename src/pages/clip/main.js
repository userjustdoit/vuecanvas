// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// noinspection JSAnnotator
import Vue from 'vue'
// noinspection JSAnnotator
import App from './App'

Vue.config.productionTip = false

const Init =require('@/base/init');

Init.init(Vue);

/* eslint-disable no-new */
// noinspection JSAnnotator
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
