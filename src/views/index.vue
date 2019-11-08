<template>
  <el-container class="container">
  <el-aside width="200px" style="color:#fff">
    <el-row class="tac" style="width:100%">
       <h5 style="height:60px;text-align:center;line-height:60px;font-size:20px;color:#ccc">黑马头条</h5>
    <el-col :span="12" style="width:100%">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item-group>
          
          <el-menu-item index="1-1">
            <router-link to="/list">文章列表</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/publish">发布文章</router-link>
          </el-menu-item>
        </el-menu-item-group>
      
      </el-submenu>
    </el-menu>
  </el-col>
  </el-row>
  </el-aside>
  <el-container>
    <el-header>
        <img :src="$axios.defaults.baseURL+user.user.head_img" alt="">
        <span style="margin:0 20px">{{user.user.nickname}}</span>
        <span @click="handlequit" style="cursor:pointer;">退出</span>
    </el-header>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:30px">
  <el-breadcrumb-item :to="{ path: '/' }">文章管理</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/list' }">文章列表</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path:'/publish'}">发布文章</el-breadcrumb-item>
</el-breadcrumb>
      <router-view></router-view></el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data(){
    return{
        user:JSON.parse(localStorage.getItem('userInfo')||'{}')
    }
  },
  mounted(){
  },
  methods:{
   handlequit(){
      this.$router.push('/login')
      localStorage.removeItem('userInfo')
   }
  }
}
</script>

<style scoped lang="less">
.container{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
   .el-header{
    background-color: #333333;
    color:#cccccc;
    line-height: 60px;
    text-align: right;
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  
  .el-aside {
    background-color: #000000;
    color: #ccc;
    
  }
  
  .el-main {
    background-color: #f2f2f2;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
    
  }
</style>