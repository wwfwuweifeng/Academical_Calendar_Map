<template>
  <div class="block">
    <el-carousel :height="height">
      <el-carousel-item v-for="(item,index) in itemImg" :key="index">
        <img :src="item.img" width="100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import{judgeIsLogin} from '@/api/api'
  export default {
    data() {
      return {
        height: '0px',
        itemImg :[{img: 'http://www.hitwh.edu.cn/bg/xxs.jpg'},
          {img: 'http://www.hitwh.edu.cn/bg/gongyu.jpg'},
          {img: 'http://www.hitwh.edu.cn/bg/bg1.jpg'},
          {img: 'http://www.hitwh.edu.cn/bg/bg2.jpg'}]
      }
    },
    mounted() {
      this.height = (window.innerHeight - 60) + 'px';
      judgeIsLogin(localStorage.sessionid).then((res)=>{
            if (res.status==0){
              this.$router.push({'path': '/login'})
            }
          })
    }
  }
</script>

<style>

</style>

