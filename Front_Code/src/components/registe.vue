<template>
<div class="login-part">
    <div class="loginPage">
        <div style="text-align:center">
        <h2>学术日历与地图用户注册</h2>
        <el-form>
            <el-form-item label="userName">
                <el-input type="text" id="user" v-model="formName.user" @blur="inputBlur('user',formName.user)"></el-input>
                <p>{{formName.userError}}</p>
            </el-form-item>
            <el-form-item label="password">
                <el-input type="password" id="password" v-model="formName.password" @blur="inputBlur('password',formName.password)"></el-input>
                <p>{{formName.passwordError}}</p>
            </el-form-item>

            <el-form-item label="againPassword">
                <el-input type="password" id="againPassword" v-model="formName.againPassword" @blur="inputBlur('againPassword',formName.againPassword)"></el-input>
                <p>{{formName.againPasswordError}}</p>
            </el-form-item>

            <el-button type="primary" @click="submitForm(formName)" v-bind:disabled="formName.beDisabled">提交注册</el-button>
            <el-button type="warning" @click="resetForm">重置</el-button>
            <el-button  type="info" @click="goBack">返回</el-button>
        </el-form>
        </div>             
    </div>
</div>
</template>
<script>
    import {addOneUser,login} from '@/api/api'
    export default {
        name: '',
        data () {
            return {
                formName: {//表单中的参数
                    user: '',
                    userError: '',
                    password: '',
                    passwordError: '',
                    beDisabled: true,
                    againPassword:'',
                    againPasswordError:''
                },
                beShow: false//传值给父组件
            }           
        },
        /*props:[
                'fromParent'
        ],*/
        methods: {
            resetForm:function(){
                this.formName.user = '';
                this.formName.userError = '';
                this.formName.password = '';
                this.formName.passwordError = '';
                this.formName.againPassword='';
                this.formName.againPasswordError='';
                this.$notify({
                            title: '重置成功',
                            message: "请重新填写注册信息",
                            type: 'success'
                            });
            },

        submitForm:function(formName){
            addOneUser(formName.user,formName.password).then((res) => {
            if (res.status == 1) {
            this.$message({
                showClose: true,
                message: '注册成功',
                type: 'success'
                });
             this.$router.push({'path': '/login'})
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

        inputBlur:function(errorItem,inputContent){
                if (errorItem === 'user') {
                    if (inputContent === '') {
                        this.formName.userError = '用户名不能为空'
                    }else{
                        this.formName.userError = '';
                    }
                }else if(errorItem === 'password') {
                    if (inputContent === '') {
                        this.formName.passwordError = '密码设置不能为空'
                    }else{
                        this.formName.passwordError = '';
                    }
                }else if(errorItem === 'againPassword') {
                    if (inputContent === '') {
                        this.formName.againPasswordError = '密码不能为空'

                    }else if (inputContent != this.formName.password)
                    {
                        this.formName.againPasswordError = '两次密码不一致';
                    }else{
                        this.formName.againPasswordError=''
                    }
                }

                if (this.formName.user != '' && this.formName.password != '' && this.formName.againPasswordError==='' && this.formName.againPassword!='') {
                    this.formName.beDisabled = false;
                }else{
                    this.formName.beDisabled = true;
                }
            },
            goBack(){
                this.$router.push({'path': '/login'})
            }
        }
    }
                //对于按钮的状态进行修改
</script>
<style scoped>

    .loginPage{
        position: absolute;
        top: 30%;
        left: 50%;
        margin-top: -150px;
        margin-left: -200px;
        width: 400px;
        min-height: 300px;
        padding: 30px 20px 20px;
        border-radius: 8px;
        box-sizing: border-box;
        background-color:   #2894FF;
        background:rgba(98,135,167,0.5);
        /*filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;*/
        /*CSS设置元素不透明度的几种方法，opacity对整个元素和其子元素都具有透明效果，RGBA和HSLA只对该元素有效果，不会影响子元素。*/
    }

    .loginPage p{
        color: red;
        text-align: left;
    }
    .el-button{
        text-align: center;
    }
</style>