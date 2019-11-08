<template>
  <el-row type="flex" justify="center" align="middle" class="container" style="height:100%">
    <div class="from-wrap">
      <h3>登录</h3>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      //表单数据对象
      form: {
        username: "",
        password: ""
      },
      //表单校验
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //点击提交按钮的时候触发
    submitForm() {
      this.$refs.form.validate(valid => {
        //表单验证通过的时才提交表单
        if (valid) {
          this.$axios({
            url: "/login",
            method: "POST",
            data: this.form
          }).then(res => {
            const { statusCode } = res.data;
            // console.log(res)
            if (statusCode == 401) {
              this.$message({
                message: "用户不存在，请重新登录",
                type: "warning"
              });
              return;
            }
            if (res.data.message == "登录成功") {
              const { data } = res.data;
              this.$message({
                message: "登陆成功!正在为您跳转到后台首页",
                type: "success"
              });
              //如果登录成功则将token和用户信息存储到本地
              localStorage.setItem("userInfo", JSON.stringify(data));
              //3秒后跳转到后台首页
              setTimeout(() => {
                this.$router.push({
                  path: "/"
                });
              }, 5000);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
.container {
  background-color: #808080;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  h3 {
    text-align: center;
    padding-bottom: 10px;
  }
}
.from-wrap {
  padding: 20px;
  width: 400px;
  height: 250px;
  background-color: #fff;
}
</style>