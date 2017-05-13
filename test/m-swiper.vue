<template>
    <m-swiper :data="swiperList" :loop="true" :initIndex="1" :auto="3000"  @click="handle"></m-swiper>
</template>

<script>
import {mSwiper} from 'vue-m-swipers';

export default {
  data () {
    return {
      swiperList:[
          {img:'http://m.internet-coin.com/static/img/downloadapp3.6edf5dc.jpg',href:'downloadApp'},
          {img:'http://mapp.alicdn.com/1493274262297OwleVG2IkYYXNEf',href:'/baodao/baodao_active.html'},
          {img:'http://m.internet-coin.com/static-index/img/bdyyj.1695151.png',href:'http://u.eqxiu.com/s/D7DOpAYT'},
          {img:'http://m.internet-coin.com/static-index/img/xbb.b85943c.png',href:'http://i.eqxiu.com/s/3gAJ83Lr'},
          {img:'http://m.internet-coin.com/static-index/img/baodao.08e44c4.jpg',href:'/article03.html'},
      ],
    }
  },
  methods:{
     handle(e){
         console.log(e)
     }
  },
  components:{ mSwiper }
}
</script>

<style lang='scss' scoped>

</style>
