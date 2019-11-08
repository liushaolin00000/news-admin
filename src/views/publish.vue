<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="标题" style="width:40%">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <!-- 调用富文本编辑器组件 -->
    <VueEditor :config="config" ref="vueEditor" style="width:80%;height:200px" />

    <!-- 栏目 -->
    <el-form-item label="活动性质" prop="type" style="margin-top:60px">
      <el-checkbox-group v-model="form.categories" style="width:60%">
        <el-checkbox
          :label="item.id"
          name="type"
          v-for="(item,index) in allcate"
          :key="index"
          v-if="item.id!==999"
        >{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <!-- 文章或者视频封面的上传 -->
    <el-upload
      action="http://127.0.0.1:3000/upload"
      :headers="{
          Authorization:token
      }"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <!-- 是文章类型还是视频类型 -->
    <el-form-item label="类型" style="height:80px;line-height:80px">
      <el-radio-group v-model="form.type">
        <el-radio label="1">文章</el-radio>
        <el-radio label="2">视频</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- <el-form-item style="height:30px"> -->
      <el-button type="primary" @click="onSubmit" style="margin-top:0px">提交</el-button>
    <!-- </el-form-item> -->
  </el-form>
</template>

<script>
//引入贤哥改良的富文本编辑器插件
import VueEditor from "vue-word-editor";
//需要单独的引入样式
import "quill/dist/quill.snow.css";
export default {
  components: {
    //注册富文本编辑器
    VueEditor
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1
      },
      //所有的栏目
      allcate: [],
      //上传图片所需要的参数
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,

      token: JSON.parse(localStorage.getItem("userInfo") || "{}").token,
      //富文本编辑器需要的参数
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("userInfo") || "{}")
              .token
          },
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            console.log(res);
            insert("http://localhost:3000" + res.data.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("userInfo") || "{}")
              .token
          },
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          }
        }
      }
    };
  },

  methods: {
    //点击表单提交的时候触发
    onSubmit() {
        const {categories} = this.form
        this.form.categories = []
        //转换栏目的数据类型
        categories.forEach((v)=>{
               this.form.categories.push({
                   id:v
               })
        })
      //点击的时候将富文本框编辑的内容保存到form表单里面的content
      var quill = this.$refs.vueEditor.editor;
      this.form.content = quill.root.innerHTML;
      console.log(this.form);
      //发布文章
      this.$axios({
        url: "/post",
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userInfo") || "{}").token
        },
        data:this.form
      }).then(res=>{
          const {message} = res.data
         if(message=="文章发布成功"){
             this.$message.success(message)
             //跳转到文章列表页
             this.$router.push('/list')
         }else{
             this.$message.error(message)
         }
      });
    },
    //封面图片上传
    //移除图片的时候触发
    handleRemove(file, fileList) {
      const { id } = file.response.data;
      const arr = [];
      this.form.cover.forEach(v => {
        if (v.id != id) {
          arr.push(v);
        }
      });
      this.form.cover = arr;
    },
    //放大图片的时候触发
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //文件上传成功的时候触发
    handleAvatarSuccess(res, file) {
      //    console.log(res,file)
      const { id } = res.data;
      this.form.cover.push({
        id: res.data.id
      });
      console.log(this.form.cover);
    }
  },
  mounted() {
    //页面加载完毕后请求栏目列表
    this.$axios({
      url: "/category"
    }).then(res => {
      this.allcate = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
 /deep/ .el-button--primary{
     margin-top: 0
 }
</style>