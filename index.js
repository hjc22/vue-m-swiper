var mSwiper = require('./vue-mSwiper/vue-mSwiper.vue');
var vueMSwiper = {
  mSwiper: mSwiper,
  install: function(Vue) {
    Vue.component('m-swiper', mSwiper)
  }
}

module.exports = vueMSwiper
