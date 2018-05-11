<template>
  <div>
  <el-row style="margin-top:40px" :gutter="30" justify>
      <el-col :span="7" :offset="5">
          <label>选择日期范围（会议举办日期位于此区间）</label><el-date-picker  type="daterange" @change="changeDate" start-placeholder="起始日期" end-placeholder="截止日期" :clearable="true" :disabled="dateoff"
          v-model="dateRange" >
          </el-date-picker>
      </el-col>
          <el-col :span="5">
          <br>
          <br>
          <el-switch style="display: block" active-color="#13ce66" v-model="showKind" @change="changeShow" :disabled="switchoff"
          inactive-color="#ff4949"  active-text="收藏的会议" inactive-text="自定义事件">
          </el-switch>
      </el-col>
      <el-col :span="3" :offset="3">
        <div style="display: flex">
          <el-button type="primary" icon="search" @click="createMeetingVisible = true">新增自定义事件
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top:30px;margin-left: 10px;">
    <el-col>
      <el-table v-loading="loading" :data="tableInfoShow['data']" style="width: 100%" highlight-current-row height="430">
        <template v-for="(item, index) in tableInfoTotal['colName']">
          <el-table-column :prop="tableInfoTotal['propName'][index]" :label="item" :key="item.key" align='center'>
          </el-table-column>
        </template>
        <el-table-column 
        label="操作"
        >
          <template scope="scope">
            <el-button type="success" size="small" 
            @click="handleSee(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="small"
              type="danger"
              @click="delCollect(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-pagination style="float:right" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                       :page-size="10" layout="total, prev, pager, next, jumper" :total="Num">
        </el-pagination>
      </el-col>
    </el-row>

<!-- ×××××××××××××自定义事件分界线××××××××××××××××× -->
<el-dialog title="自定义事件" :visible.sync="createMeetingVisible">
<el-form :model="createMeetingForm" label-width="120px">
  <el-form-item label="事件名称">
    <el-input v-model="createMeetingForm.name" placeholder="最少1字，最多100字" :maxlength="100"  @blur="inputBlur('name',createMeetingForm.name)"></el-input>
  </el-form-item>
  <el-form-item label="事件时间区间">
    <el-col :span="11">
      <el-date-picker  value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" @blur="inputBlur('dateRange',createMeetingForm.dateRange)"
      end-placeholder="结束日期" v-model="createMeetingForm.dateRange"></el-date-picker>
    </el-col>
  </el-form-item>

  <el-form-item label="事件地点">
    <el-input v-model="createMeetingForm.locate" placeholder="最少1字，最多100字" :maxlength="100" @blur="inputBlur('locate',createMeetingForm.locate)"></el-input>
  </el-form-item>

  <el-form-item label="事件描述">
    <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" v-model="createMeetingForm.describe" @blur="inputBlur('describe',createMeetingForm.describe)" placeholder="最少1字" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="createMeeting" v-bind:disabled="createDisabled" >提交创建</el-button>
    <el-button type="warning" @click="resetForm">重置内容</el-button>
    <el-button type="info" @click="createMeetingVisible = false">关闭窗口</el-button>
  </el-form-item>
</el-form>
</el-dialog>

<!-- 系统生成的会议信息查看×××××××××××××××××× -->
<el-dialog title="会议信息" :visible.sync="dialogSysVisible">
      <el-row style="margin-top:10px">
        <el-form label-width="130px">
          <el-form-item label="会议名称">
            <el-input type="textarea"
                      :autosize="{ minRows:1, maxRows: 4}" v-model="meetingInfo.name" auto-complete="off"
                      :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="会议举办单位">
            <el-input type="textarea"
                      :autosize="{ minRows:1, maxRows: 4}" v-model="meetingInfo.sponsor" auto-complete="off"
                      :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="会议举办日期">
            <el-input v-model="meetingInfo.openDate" auto-complete="off" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="会议类型及地点">
            <el-input v-model="meetingInfo.locateAndKind" auto-complete="off" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="goMeetingUrl">切换到会议介绍页面</el-button>
            <el-button @click="dialogSysVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <div id="allmapSys" class="allmap"></div>
    </el-dialog>

<!-- 自定义生成的事件信息查看×××××××××××××××××× -->
<el-dialog title="自定义事件信息" :visible.sync="dialogMyselfVisible">
      <el-row style="margin-top:10px">
        <el-form label-width="130px">
          <el-form-item label="事件名称">
            <el-input type="textarea"
                      :autosize="{ minRows:1, maxRows: 4}" v-model="meetingInfo.name" auto-complete="off"
                      :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="事件地点">
            <el-input type="textarea"
                      :autosize="{ minRows:1, maxRows: 4}" v-model="meetingInfo.locate" auto-complete="off"
                      :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="事件日期">
            <el-input v-model="meetingInfo.openDate" auto-complete="off" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="事件描述">
            <el-input type="textarea"
                      :autosize="{ minRows:1, maxRows: 10}" v-model="meetingInfo.describe" auto-complete="off" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="dialogMyselfVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <div id="allmapMyself" class="allmap"></div>
    </el-dialog>



  </div>
</template>

<script>

  import headerCompone from '@/components/header.vue'
  import{judgeIsLogin} from '@/api/api'
  import {getmyselfmeeting,querymeeting,delcollectmeeting,createmyselfmeeting,querymyselfmeeting} from '@/api/api'

  export default {
    data() {
      return {
        showKind:true,  //true在右边
        dateRange:'',
        tableInfoTotal: '',
        tableInfoShow: {'data': []},
        tableInfoTemp:{'tableData':[]},
        Num: 0,
        currentPage: 0,
        loading:'true',
        meetingInfo:'',
        dialogSysVisible:false,
        dialogMyselfVisible:false,
        isBySystem:1,
        switchoff:true,
        dateoff:true,
        createDisabled:true,
        createMeetingVisible:false,
        addrLocation:'',
        createMeetingForm:{
          'name':'',
          'dateRange':'',
          'locate':'',
          'describe':'',
        },
      }
    },
    components: {
      headerCompone
    },
    methods: {
      changeShow(){
        if (this.showKind){
          this.isBySystem=1
        }else{
          this.isBySystem=0
        }
        this.dateRange=''
        this.showTable()

      },

      changeDate(){
        // alert(this.dateRange[0])
        if (this.dateRange === null) {
          this.currentPage = 0
          this.tableInfoTemp['tableData'] = this.tableInfoTotal['tableData']
          this.Num = this.tableInfoTotal['tableData'].length
          for (var i = 0; i < 10 && i < this.Num; i++) {
            this.tableInfoShow['data'].push(this.tableInfoTotal['tableData'][i])
          }
        }
        else {
          this.currentPage = 0
          this.tableInfoShow['data'] = []
          this.tableInfoTemp['tableData'] = []
          // let flag = false
          for (let i in this.tableInfoTotal['tableData']) {
            if ((new Date(this.tableInfoTotal['tableData'][i]['time_begin'].slice(0, 10)).getTime() >= this.dateRange[0].getTime()) && (new Date(this.tableInfoTotal['tableData'][i]['time_end'].slice(0, 10))).getTime() < this.dateRange[1].getTime()+ 86400000) {
               // + 86400000
              this.tableInfoTemp['tableData'].push(this.tableInfoTotal['tableData'][i])
            }
          }
          this.Num = this.tableInfoTemp['tableData'].length
          for (var i = 0; i < 10 && i < this.Num; i++) {
            this.tableInfoShow['data'].push(this.tableInfoTemp['tableData'][i])
          }
        }
      },

      handleCurrentChange(val) {
        this.tableInfoShow['data'] = []
        for (var i = 0; i < 10; i++) {
          this.tableInfoShow['data'].push()
        }
        var j = 0
        for (var i = (val - 1) * 10; i < (val - 1) * 10 + 10 && i < this.Num; i++ , j++) {
          this.$set(this.tableInfoShow['data'], j, this.tableInfoTotal['tableData'][i])
        }
        //console.log(this.tableInfoShow['data'])
      },

      delCollect(index, row) {
        delcollectmeeting(localStorage.sessionid,row.by_system,row.id,row.name).then((res) => {
          if (res.status == 1) {
          this.showTable();
          this.dateRange='';
          this.$notify({
              title: '删除成功',
              type: 'success'
           });
          // this.dateRange=''

          }
          else {
            this.$notify({
              title: '删除失败',
              message: res['errorInfo'],
              type: 'warning'
            })
          }
        // console.log(this.tableInfoShow)
      })

      },
      handleSee(index, row) {
        if (this.showKind===true){
          querymeeting(1, row.id).then((res) => {
          if (res.status == 1) {
            this.meetingInfo = res.data;
            this.addrLocation= res.data.location;
             this.dialogSysVisible = true;
            setTimeout(this.showMap, 1000)

          }
          else {
            this.$notify({
              title: '获取失败',
              message: res['errorInfo'],
              type: 'warning'
            })
          }
          // console.log(this.tableInfoShow)
        })
            }else{
            querymyselfmeeting(row.name).then((res) => {
          if (res.status == 1) {
            this.meetingInfo = res.data;
            this.addrLocation= res.data.location;
            this.dialogMyselfVisible=true;
            setTimeout(this.showMap, 1000)
          }
          else {
            this.$notify({
              title: '获取失败',
              message: res['errorInfo'],
              type: 'warning'
            })
          }
          // console.log(this.tableInfoShow)
        })
            }
        // this.$router.push({ path:'/showmyselfblog/'+row.url});
      },
    showMap(){
      var map;
        if (this.showKind===true){
          map= new BMap.Map("allmapSys"); 
        }else{
           map = new BMap.Map("allmapMyself");    // 创建Map实例
        }
        this.point = new BMap.Point(this.addrLocation.lng,this.addrLocation.lat);
        map.centerAndZoom(this.point, 12);  // 初始化地图,设置中心点坐标和地图级别
        var marker = new BMap.Marker(this.point);        // 创建标注    
        map.addOverlay(marker);                     // 将标注添加到地图中 
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
          mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
          ]
        }));
        // map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  },
      showTable(){
      this.loading=true;
      this.switchoff=true;
      this.dateoff=true;
      getmyselfmeeting(localStorage.sessionid, this.isBySystem).then((data) => {
        this.tableInfoTotal = data
        this.Num = this.tableInfoTotal['tableData'].length
        this.tableInfoShow['data']=[]
        // console.log(data)
        for (var i = 0; i < 10 && i < this.Num; i++) {
          this.tableInfoShow['data'][i] = this.tableInfoTotal['tableData'][i]
        }
        this.loading=false;
        this.switchoff=false;
        this.dateoff=false;
      })
      },

      resetForm:function(){
          this.createMeetingForm={
                'name':'',
                'dateRange':'',
                'locate':'',
                  'describe':'',
                    },
          this.$notify({
                title: '重置成功',
                message: "请重新填写注册信息",
                type: 'success'
          });
            },
      goMeetingUrl() {
        window.open(this.meetingInfo.reference_url)
      },
    createMeeting(){
      var dateBegin=this.createMeetingForm.dateRange[0];
      var dateEnd=this.createMeetingForm.dateRange[1];
      createmyselfmeeting(localStorage.sessionid,this.createMeetingForm.name,dateBegin,dateEnd,this.createMeetingForm.locate,this.createMeetingForm.describe).then((res)=>{
        if (res.status==1){
              this.$notify({
                title: '创建成功',
                type: 'success'
          });
          this.createMeetingForm={
                'name':'',
                'dateRange':'',
                'locate':'',
                  'describe':'',
            };
            this.createMeetingVisible=false;
              if (this.showKind===false){
                this.showTable();
              }
            }else{
              this.$notify({
              title: '获取失败',
              message: res['errorInfo'],
              type: 'warning'
            })
            }
      });

    },
    inputBlur:function(errorItem,inputContent){
        if(inputContent==='' && this.createMeetingVisible===true){
          this.createDisabled=true;
          this.$message({
          message: '请将信息补充完整',
          type: 'warning'
        });
        }else{
            this.createDisabled=false;
        }

      },

    },
    mounted() {
      judgeIsLogin(localStorage.sessionid).then((res)=>{
            if (res.status==0){
              this.$router.push({'path': '/login'})
            }
          });

      this.showTable();


    }
  }
</script>

<style scoped>
  .content {
    top: 60px;
  }
  .allmap {
    height: 200px;
    overflow: hidden;
  }
</style>
