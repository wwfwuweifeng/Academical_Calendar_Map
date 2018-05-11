<template>
  <div class="login-part">
    <div class="login-main">
      <h1>学术日历与地图</h1>
      <div class="login-form">
        <div>
          <label>账号</label>
          <input type="text" name="username" v-model="username">
          <label>密码</label>
          <input type="password" name="password" v-model="password">
            <el-button class="login-btn" type="success" @click="sub">登录</el-button>
            <el-button class="login-btn" type="primary" @click="gotoRegiste">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from '@/api/api'
  export default {
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      sub() {
        login(this.username,this.password).then((res) => {
          if (res.status == 1) {
            localStorage.userid = this.username
            localStorage.sessionid = res.session_id
             this.$router.push({'path': '/index'})
          }
          else {
            this.$notify({
              title: '操作失败',
              message: res['errorInfo'],
              type: 'warning'
            })
          }
        })
      },
      gotoRegiste(){
        this.$router.push({'path': '/registe'})
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .login-part {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #F9F9F9;
    padding: 1px;
    box-sizing: border-box;
  }

  .login-main {
    width: 35%;
    height: 350px;
    margin: 160px auto;
    text-align: center;
  }

  .login-part h1 {
    font-size: 30px;
    font-weight: 300;
    letter-spacing: 2px;
  }

  .login-form {
    width: 320px;
    height: 290px;
    background-color: white;
    margin: 20px auto;
    border: 1px solid #d8dee2;
    border-radius: 5px;
    padding: 15px;
    text-align: left;
  }

  .login-form label {
    font-size: 16px;
    font-weight: 300;
  }

  .login-form input {
    width: 100%;
    height: 30px;
    display: block;
    border-radius: 3px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #d8dee2;
    box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
    font-size: 17px;
  }

  .login-form input:focus {
    border-color: #83C1F1;
  }

  .login-btn {
    width: 45%;
    height: 40px;
    margin-top: 25px;
    border-radius: 4px;
    border: none;
    font-size: 16px;
    cursor: pointer;

  }

  .login-btn:hover {
    background-color: #E6A23C;
  }

  .forget-psd {
    color: #0366DC;
    font-size: 12px;
    margin-top: 12px;
    margin-left: 200px;
    cursor: pointer;
  }

  .register-tip {
    margin-top: 50px;
    font-weight: 300;
    font-size: 16px;
  }

  .register-tip a:link {
    color: #0366DC;
  }

  .register-tip a:hover {
    color: #0366DC;
  }

  .register-tip a:active {
    color: #0366DC;
  }

  .register-tip a:visited {
    color: #0366DC;
  }
</style>
