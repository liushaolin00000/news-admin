<template>
<div>
  <!-- 文章表格管理 -->
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="序号"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.$index+1}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文章标题"
      width="300">
      <template slot-scope="scope">
        <span>{{scope.row.title}}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="显示"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.open==1?'打开':'关闭' }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="类型"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{  scope.row.type==1?'文章':'视频' }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          :type="scope.row.open==1?'danger':'success'"
          @click="handleDelete(scope.$index, scope.row)">{{scope.row.open==1?'关闭':'打开'}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页完整功能 -->
   <div class="block" style="margin-top:10px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[ 5, 6,7,8]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        pageIndex:1,
        pageSize:5,
        total:0
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      //点击关闭和打开时触发
      handleDelete(index, row) {
        console.log(index, row);
        this.$axios({
            url:`/post_update/${row.id}`,
            method:'POST',
            headers:{
                Authorization:JSON.parse(localStorage.getItem('userInfo')||'{}').token
            },
            data:{
                open:row.open==1?0:1,
            }
        }).then(res=>{
            // console.log(res)
            if(res.data.message=="文章编辑成功"){
                this.$message.success(res.data.message)
            }else{
                this.$message.success(res.data.message)
            }
            //编辑过后重新请求文章数据
            this.getlist()
        })
      },

     //分页的两个方法
     //点击每页显示条数时触发
      handleSizeChange(val) {
         this.pageSize = val
         this.getlist()
      },
      //点击切换页码的时候触发
      handleCurrentChange(val) {
        //  console.log(val)
        this.pageIndex = val;
        this.getlist()
      },
      
      //封装一个请求文章数据的方法
      getlist(){
          this.$axios({
            url:`/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`,
        }).then(res=>{
           this.tableData=res.data.data
        })
      }
    },
    mounted(){
      this.getlist()
      //请求总的数据
      this.$axios({
          url:'/post?pageIndex=1&pageSize=11111'
      }).then(res=>{
          console.log(res)
          this.total = res.data.data.length
      })
    }
  }
</script>