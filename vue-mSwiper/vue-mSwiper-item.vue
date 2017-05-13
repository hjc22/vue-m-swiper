<template>
    <li class="m-swiper-item" :style="{width:(100/($parent.loop?$parent.itemLength+2:$parent.itemLength))+'%'}">
      <div class="m-swiper-item-box">
        <slot></slot>
      </div>
    </li>
</template>

<script>
export default {
  data () {
    return {

    }
  }

}
</script>

<style lang='scss' scoped>
.m-swiper-item{
   .m-swiper-item-box{
      width: 100%;
      font-size: 0;
   }
   display: inline-block;
}
</style>
