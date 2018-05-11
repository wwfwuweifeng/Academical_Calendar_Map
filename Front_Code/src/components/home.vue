<template>
  <div style="width:100%">
    <headerCompone>
    </headerCompone>
    <div class="content">
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>

  import headerCompone from '@/components/header.vue'
  import{judgeIsLogin} from '@/api/api'

  export default {
    data() {
      return {
      }
    },
    components: {
      headerCompone
    },
    mounted() {
      // judgeIsLogin(localStorage.sessionid).then((res)=>{
      //       if (res.status==0){
      //         localStorage.clear()
      //         location.reload()
      //         this.$router.push({'path': '/login'})
      //       }
      //     })
      this.$router.push({'path': '/index'})
    }
  }
</script>

<style scoped>
  .content {
    top: 60px;
  }
</style>
