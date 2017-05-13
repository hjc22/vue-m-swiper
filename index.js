var {mSwiper} = require('./vue-mSwiper');
var vueMSwiper = {
  mSwiper: mSwiper,
  install: function(Vue) {
    Vue.component('m-swiper', mSwiper)
  }
}

module.exports = vueMSwiper
