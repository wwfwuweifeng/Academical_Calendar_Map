<template>
  <el-row>
    <el-col>
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b" router>
    <el-menu-item index="china">国内会议</el-menu-item>
    <el-menu-item index="international">国际会议</el-menu-item>
    <el-menu-item index="schedule">我的日程</el-menu-item>
 <!--    <el-dropdown style="cursor: pointer; float:right;margin-top: 15px;margin-right: 10px">
        <span style="color:#CCFF99;font-size:15px;">
          {{this.userid}}
        </span>
      <el-dropdown-menu @command="handleCommand1" slot="dropdown">
        <el-dropdown-item command="a">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->

      <el-col :span="2" style="float:right">
      <el-dropdown @command="handleCommand1" style="cursor: pointer; float:right;margin-top: 15px;margin-right: 10px">
        <span style="color:#FFFFFF;font-size:18px;">
          {{this.userid}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>

  </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  import {Exit} from '@/api/api'
  export default {
  data() {
    return {
      userid: localStorage.userid
    }
  },
    methods:{
      handleCommand1(command) {

        if(command == "a")
        {
          Exit(localStorage.sessionid).then((res)=>{
            if (res.status==1){
              localStorage.clear()
              location.reload()
              this.$router.push({'path': '/login'})
            }else{
              this.$notify({
              title: '操作失败',
              message: res['errorInfo'],
              type: 'warning'
            })}

          })

        }
      },


    }
  }
</script>

<style scoped>

</style>

