<template>
  <div>
    <el-row style="margin-top:40px" :gutter="40" justify>
      <el-col :span="5" :offset="6">
        <el-input placeholder="模糊搜索" icon="search" v-model="inputDataForSearch"
                  :on-icon-click="filterByInputDataForSearch" @keyup.enter.native="filterByInputDataForSearch">
        </el-input>
      </el-col>
      <el-col :span="3">
        <div style="display: flex">
          <el-button type="primary" icon="search" @click="filterByInputDataForSearch" :loading="loadingButton">搜 索
          </el-button>
          <el-button type="primary" icon="delete2" @click="delInputDataForSearch">清空条件</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top:30px;margin-left: 10px;">
      <el-col>
        <el-table v-loading="loading" :data="tableInfoShow['data']" style="width: 100%" highlight-current-row
                  height="430">
          <template v-for="(item, index) in tableInfoTotal['colName']">
            <el-table-column :prop="tableInfoTotal['propName'][index]" :label="item" :key="item.key" align='center'>
            </el-table-column>
          </template>
          <el-table-column
            label="操作"
          >
            <template scope="scope">
              <el-button type="success" size="small"
                         @click="handleSee(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                size="small"
                type="primary"
                @click="handleCollect(scope.$index, scope.row)">收藏
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="会议信息" :visible.sync="dialogFormVisible">
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
            <el-button @click="dialogFormVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <div id="allmap" class="allmap"></div>
    </el-dialog>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-pagination style="float:right" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                       :page-size="10" layout="total, prev, pager, next, jumper" :total="Num">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {meetinggettable, querymeeting, collectmeeting} from '@/api/api'

  export default {
    data() {
      return {
        tableInfoTotal: '',
        tableInfoShow: {'data': []},
        tableInfoTemp: '',
        Num: 0,
        inputDataForSearch: '',
        currentPage: 0,
        elements: {},
        loadingButton: false,
        dialogFormVisible: false,
        meetingInfo: '',
        map: '',
        point: '',
        loading: 'true',
        addrLocation:'',
      }
    },
    // directives: {
    //   //将该dom注册进this中
    //   run(el, binding) {
    //     if (typeof binding.value == 'function')
    //       binding.value(el);
    //   }
    // },
    methods: {
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

      handleCollect(index, row) {

        collectmeeting(localStorage.sessionid, row.id).then((res) => {
          if (res.status == 1) {

            // this.map.centerAndZoom(this.point, 15);                 // 初始化地图，设置中心点坐标和地图级别
            // console.log(this.tableInfoShow)
            this.$notify({
              title: '收藏成功',
              type: 'success'
            });

          }
          else {
            this.$notify({
              title: '收藏失败',
              message: res['errorInfo'],
              type: 'warning'
            })
          }
          // console.log(this.tableInfoShow)
        })

      },
      handleSee(index, row) {
        querymeeting(1, row.id).then((res) => {
          if (res.status == 1) {
            this.meetingInfo = res.data;
            this.addrLocation= res.data.location;
            this.dialogFormVisible=true;
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
        // this.$router.push({ path:'/showmyselfblog/'+row.url});
      },
    showMap(){
        var map = new BMap.Map("allmap");    // 创建Map实例
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
      filterByInputDataForSearch() {
        //this.tableInfoShow = ''
        var index
        var indexProp
        var tableInfoShowTemp = JSON.parse(JSON.stringify(this.tableInfoTotal))
        var ifpush
        this.loadingButton = true
        tableInfoShowTemp['tableData'] = new Array()
        for (index in this.tableInfoTotal['tableData']) {
          ifpush = false
          for (indexProp in this.tableInfoTotal['propName']) {
            if (this.tableInfoTotal['tableData'][index][this.tableInfoTotal['propName'][indexProp]] != null && this.tableInfoTotal['tableData'][index][this.tableInfoTotal['propName'][indexProp]].match(this.inputDataForSearch) != null) {
              ifpush = true
              break
            }
          }
          if (ifpush == true) {
            tableInfoShowTemp['tableData'].push(this.tableInfoTotal['tableData'][index])
          }
        }
        //        this.tableInfoShow = tableInfoShowTemp
        this.currentPage = 0
        this.tableInfoTemp = tableInfoShowTemp
        this.tableInfoShow['data'] = []
        this.Num = tableInfoShowTemp['tableData'].length
        for (var i = 0; i < 10 && i < this.Num; i++) {
          this.$set(this.tableInfoShow['data'], i, tableInfoShowTemp['tableData'][i])
        }

        this.loadingButton = false
      },

      delInputDataForSearch() {
        this.currentPage = 0
        this.inputDataForSearch = ''
        this.tableInfoTemp = this.tableInfoTotal
        this.tableInfoShow['data'] = []
        this.Num = this.tableInfoTemp['tableData'].length
        for (var i = 0; i < 10 && i < this.Num; i++) {
          this.$set(this.tableInfoShow['data'], i, this.tableInfoTemp['tableData'][i])
          // this.tableInfoShow['data'][i] = this.tableInfoTotal['tableData'][i]
        }
      },
      goMeetingUrl() {
        window.open(this.meetingInfo.reference_url)
      }


    },
    mounted() {
      this.loadingButton = true;
      this.loading = true;
      meetinggettable(localStorage.sessionid, 'inChina').then((data) => {
        this.tableInfoTotal = data
        this.Num = this.tableInfoTotal['tableData'].length
        // console.log(data)
        for (var i = 0; i < 10 && i < this.Num; i++) {
          this.tableInfoShow['data'][i] = this.tableInfoTotal['tableData'][i]
        }
        // console.log(this.tableInfoShow)
        this.loading = false;
        this.loadingButton = false;
      })
    }
  }
</script>

<style scoped>
  .allmap {
    height: 200px;
    overflow: hidden;
  }
</style>