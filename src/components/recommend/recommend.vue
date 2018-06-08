<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recomments.length" class="slider-wrapper">
        <slider>
					<div :key="key" v-for="(item,key) in recomments">
						<a :href="item.linkUrl">
							<img :src="item.picUrl">
						</a>
					</div>
				</slider>

      </div>
    </div>
    <!-- 热门歌单推荐 -->
  </div>
</template>
<script>
  import Slider from 'base/slider/slider'
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  export default {
    components: {
      Slider
    },
    data() {
      return {
        recomments: []
      }
    },
    created() {
      this._getRecommend()
    },
    mounted() {
      // console.log('qq',this.props)
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
						this.recomments = res.data.slider
						// console.log(this.recomments)
          }
        })
      }
    }
  }

</script>
<style scoped>
  .recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
  .recommend-content{
    height: 100%;
    overflow: hidden;
  }
  .slider-wrapper{
    position: relative;
    width: 100%;
    overflow: hidden;
  }

</style>
