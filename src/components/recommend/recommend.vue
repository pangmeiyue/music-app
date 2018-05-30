<template>
    <div>
			<slider></slider>
			热门歌单推荐
		</div>
</template>
<script>
import Slider from 'base/slider/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
	components:{
		Slider
	},
	created(){
		this._getRecommend() 
	},
	mounted(){

	},
	methods: {
		_getRecommend(){
			getRecommend().then((res)=>{
				if(res.code === ERR_OK){
					console.log(res.data.slider)
				}
			})
		}
	}
}
</script>
<style>

</style>


