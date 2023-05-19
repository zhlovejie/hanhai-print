<template>
  <div class="user-account-info-wrapper">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户账号" prop="username">
        <el-input v-model="ruleForm.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop="realname">
        <el-input v-model="ruleForm.realname"></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="生日" prop="birthday">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.birthday"
          format="yyyy-MM-dd"
          value-format="timestamp"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="头像" >
        <UploadImage v-model="ruleForm.avatar"></UploadImage>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo, userEdit } from "@/api/user";
import UploadImage from "@/components/common/UploadImage";
export default {
  name: "user-account-info",
  components: {
    UploadImage,
  },
  data() {
    return {
      ruleForm: {},
      rules: {},
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      getInfo().then((res) => {
        let result = res.result;
        result.birthday = new Date(result.birthday).getTime();
        this.ruleForm = result;
      });
    },
    submitForm(formName) {
      const that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          userEdit(that.ruleForm)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.fetchUserInfo();
              }
            })
            .catch((err) => {
              that.$message.info(err.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-account-info-wrapper {
  max-width: 800px;
  padding: 20px;
}
</style>
