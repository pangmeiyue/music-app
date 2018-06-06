<template>
  <div class="slider">
    <div class="slider-group">
      <!-- vue自带插槽 -->
      <slot></slot>
    </div>
    <div class="dots">

    </div>
  </div>
</template>
<script>
  // import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    props: {
      //是否循环轮播
      loop: {
        type: Boolean,
        default: true
      },
			//是否自动轮播
			autoPlay: {
				type: Boolean,
				default: true
			},
			//轮播时间间隔
			interval: {
				type: Number,
				default: 3000
			}
    },
    data() {

    }
  }

</script>
<style>


</style>
