<template>
    <li class="m-swiper-item in-bk-center" :style="{width:(100/($parent.loopOpt?$parent.itemLength+2:$parent.itemLength))+'%'}">
      <div class="m-swiper-item-box center-box">
        <slot></slot>
      </div>
    </li>
</template>

<script>
export default {
  
}
</script>

<style lang='scss' scoped>
.m-swiper-item{
   .m-swiper-item-box{
      width: 100%;
      font-size: 0;
   }
   display: inline-block;
   height: 100%;
   position: relative;
}
.in-bk-center{
	  font-size: 0;
}
.in-bk-center:after{
	 display:inline-block;
	 width:0;
	 height:100%;
	 vertical-align:middle;
	 content:'';
}
.center-box{
	 display: inline-block;
	 vertical-align: middle;
}
</style>
