<template>
    <div class="m-swiper"  @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" ref="swiper">
        <ul class="m-swiper-items" v-if="data.length!==0" :style="{'transform':transX,'transition':isAnim,width:(100*(loopOpt?itemLength+2:itemLength))+'%'}">
          <m-swiper-item v-if="loopOpt" key="swiper">
            <img :src="urlName?data[data.length-1][urlName]:data[data.length-1]" class="swiper-img" @click="$emit('click',data.length-1)"/>
          </m-swiper-item>
           <m-swiper-item v-for="(item,index) in data" key="swiper">
             <img :src="urlName?item[urlName]:item" class="swiper-img" @click="$emit('click',index)"/>
           </m-swiper-item>
           <m-swiper-item v-if="loopOpt" key="swiper">
             <img :src="urlName?data[0][urlName]:data[0]" class="swiper-img" @click="$emit('click',0)"/>
           </m-swiper-item>
        </ul>
        <div class="m-swiper-dots">
             <div v-for="(i,index) in itemLength" :class="['m-swiper-dot',dotsIndex==index?'active':'']"></div>
        </div>
    </div>
</template>

<script>
import mSwiperItem from './vue-mSwiper-item';
export default {
  name:'m-swiper',
  data () {
    return {
        itemLength:0,
        activeIndex:0,
        dotsIndex:0,
        oPos:{},
        startX:null,
        startY:null,
        startT:null,
        transNumber:0,
        endNumber:0,
        transDuration:0,
        swiperWidth:0,
        timer:null,
        touchsLength:1,
        queue:[],
        list:[],
        loopOpt:true
    }
  },
  props:{
    loop:{
       type:Boolean,
       default:true
    },
    data:{
       type:Array
    },
    auto:{
       type:Number,
       default:0
    },
    initIndex:{
       type:Number,
       default:0
    },
    urlName:{
       type:[String,Boolean]
       default:false
    }
  },

  mounted(){
    if(this.data.length==0) return;
    this.optionsInit();
    this.mountedInit();

  },
  computed:{
      transX(){
        return 'translateX('+this.transNumber+'px)';
      },
      isAnim(){
        return 'all '+this.transDuration+'ms';
      }
  },
  methods:{
    optionsInit(){
       this.itemLength=this.data.length;
       if(this.initIndex>this.itemLength-1) return console.error('iniIndex Can not be bigger than data length');
       this.dotsIndex=this.initIndex;
       this.loopOpt=this.itemLength>1?this.loop:false;
       this.activeIndex=this.loopOpt?this.initIndex+1:this.initIndex;

    },
    mountedInit(){
       this.swiperWidth=this.$el.clientWidth || this.$root.$el.clientWidth || window.innerWidth;
       this.transNumber=-this.swiperWidth*this.activeIndex;
       if(this.auto && this.loopOpt) this.autoPlay();
    },
    touchPos(e){
      var touches = e.changedTouches, l = touches.length, touch, tagX, tagY,time;
      this.touches=l;
      if(l!=1) return;

      if(this.queue.length>1) return;

      touch = touches[0];tagX = touch.pageX;tagY = touch.pageY;
      this.oPos.x = tagX;this.oPos.y = tagY;this.oPos.time=new Date();
    },
    touchStart(e,fn){
        this.swiperWidth=this.$el.offsetWidth;
        if(this.loopOpt){
          this.stopTransition(0);
          if(this.activeIndex==this.itemLength+1){
            this.activeIndex=1;
            this.transNumber=-this.swiperWidth;
          }
          else if(this.activeIndex==0){
              this.activeIndex=this.itemLength;
              this.transNumber=-this.itemLength*this.swiperWidth;
          }
        }
        if(e){
          this.queue.push(1);
          this.stopTransition(0);
          clearInterval(this.timer);
          if(this.touchesLength>1) return;
          this.touchPos(e);
          this.startX=this.oPos.x;
          this.startY=this.oPos.y;
          this.startT=this.oPos.time;
          this.endNumber=this.transNumber;
        }
        else{
            setTimeout(fn,30)
        }
    },
    touchMove(e){
        this.touchPos(e);
        if(this.touchesLength>1) return;

        var moveX=this.oPos.x-this.startX,
        moveY=this.oPos.y-this.startY;
        if(!!(Math.abs(moveX) >= Math.abs(moveY))){
           this.prevent(e);
           this.transNumber=this.endNumber+moveX;
        };
    },
    touchEnd(e){
        this.stopTransition(200);

        if(e){

          this.endNumber=0;
          this.touchPos(e);
          var duration=new Date()-this.startT,moveX=this.oPos.x-this.startX,moveY=this.oPos.y-this.startY;
          if(this.auto && this.loopOpt) this.autoPlay();
          this.queue.pop();
          if(!moveX) return;
          if(Number(duration) > 200) return this.action(moveX,this.swiperWidth/2)
        }
        var m=e?moveX:-40;
        this.action(m,30);
    },
    action(move,midPos){
          if(this.touchesLength>1) return;
          if(this.loopOpt){
            if(move > midPos){
              this.activeIndex--;
              if(this.dotsIndex<=0) this.dotsIndex=this.itemLength-1;
              else this.dotsIndex--;
            }
            else if(move < -midPos) {
              this.activeIndex++;
              if(this.dotsIndex>=this.itemLength-1) this.dotsIndex=0;
              else this.dotsIndex++;
            }
          }
          else{
             this.noLoop(move,midPos);
          }
        this.transNumber=-(this.activeIndex*this.swiperWidth);
    },
    prevent(e){
        e.preventDefault();
    },
    stopTransition(t){
        this.transDuration=t;
    },
    noLoop(move,midPos){
      if(move > midPos){
          if(this.activeIndex != 0) this.dotsIndex--,this.activeIndex--;
      }
      else if(move < -midPos){
          if(this.activeIndex != this.itemLength-1) this.dotsIndex++,this.activeIndex++;
      }
    },
    autoPlay(){
       clearInterval(this.timer);
       this.timer=setInterval(()=>{
          this.touchStart(0,this.touchEnd);
       },this.auto)
    },
    optionsWatch(){
       this.timer && clearInterval(this.timer);
       this.optionsInit();
       this.mountedInit();
    },
  },
  activated(){
     if(this.loopOpt && this.auto) this.autoPlay();
  },
  destroyed(){
     this.timer && clearInterval(this.timer);
  },
  deactivated(){
    this.timer && clearInterval(this.timer);
  },
  watch:{
     initIndex(n,o){
        if(n==o) return;
        this.optionsWatch();
     },
     loop(n,o){
        if(n==o) return;
        this.optionsWatch();
     },
     data(n,o){
        if(n==o) return;
        this.$nextTick(()=>{
          this.optionsInit();
          this.mountedInit();
        })
     }
  },
  components:{ mSwiperItem }

}
</script>

<style lang='scss' scoped>
.m-swiper{
   position: relative;
   width: 100%;
   overflow: hidden;
   height: 100%;
}
.m-swiper-items{
   font-size: 0;
   height: 100%;
}
.m-swiper-dots{
   position: absolute;
   bottom:10px;
   left:50%;
   transform: translate(-50%);
   -webkit-transform: translate(-50%);

  //  text-align: center;

}
.m-swiper-dot{
   width: 8px;
   height: 8px;
   border-radius: 100%;
   background: #000;
   opacity: .2;
   display: inline-block;
   margin: 0 3px;
   transition: all .2s;
   -webkit-transition: all .2s;
   &.active{
      background: #00cfc4;
      opacity: 1;
   }
}
.swiper-img{
   width: 100%;
}
</style>
