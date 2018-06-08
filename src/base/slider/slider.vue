<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <!-- vue自带插槽 -->
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :key="key" v-for="(item,key) in dots" 
      :class="{active: currentPageIndex === key}">
      </span>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
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
      return {
        dots: [],
        currentPageIndex: 0   //当前第几页
      }
    },
    mounted() {
      //保证dom成功渲染
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        //是否自动播放
        if(this.autoPlay){
          this._play()
        }
      }, 20)
    },
    methods: {
      //slider宽度
      _setSliderWidth() {
        this.children = this.$refs.sliderGroup.children

        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth
        // console.log(sliderWidth) //374
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child,'slider-item')
          child.style.width = sliderWidth +'px'
          width += sliderWidth
        }
        if(this.loop){
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width+ 'px'
      },
      //初始化slider
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider,{
          scrollX: true,
          scrollY: false,
          momentum: false, //快速滑动是否开启惯性
          snap:true,
          snapLoop: this.loop, //无缝循环轮播
          snapThreshold: 0.3, //手指滑动页面可切换的阔值，大于这个值可以滑动下一页
          snapSpeed: 400, //轮播切换的动画时间
          click: true

        })
        //在滑动一张图片结束的时候
        this.slider.on('scrollEnd',()=>{
          let pageIndex = this.slider.getCurrentPage().pageX
          if(this.loop){
            pageIndex-=1
          }
          this.currentPageIndex = pageIndex
          if(this.autoPlay){
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      //原点
      _initDots(){
        this.dots = new Array(this.children.length)
      },
      _play(){
        let pageIndex = this.currentPageIndex +1
        if(this.loop){
          pageIndex += 1
        }
        this.timer = setTimeout(()=>{
          this.slider.goToPage(pageIndex,0,400)
        },this.interval)
      }
    }
  }

</script>
<style scoped>
  .slider {
    height: 1px;
    /* position: relative; */
  }

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }

  .slider-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }

  .slider-item a {
    display: block;
    width: 100%;
    overflow: hidden;
  }
  .slider-item img{
    display: block;
    width: 100%;
  }
  .dots{
    position: absolute;
    right: 0;
    left: 0;
    /* bottom: 12px; */
    top: 217px;
    text-align: center;
    font-size: 0;
  }
  .dot{
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color:rgb(255,255,255,0.5);
  }
  .dot.active{
    width: 20px;
    border-radius: 5px;
    background-color:rgb(255,255,255,0.8);
  }
    

</style>
