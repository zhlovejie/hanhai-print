<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    width="600px"
    :close-on-click-modal="false"
    v-loading="loading"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户账号">
        {{ user.username }}
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input
          v-model="ruleForm.newpassword"
          maxlength="50"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleCancel">取 消</el-button>
      <el-button size="small" type="primary" @click="handleOk">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { usetResetPassword } from "@/api/user";
export default {
  name: "user-reset-password-sys",
  data() {
    return {
      visible: false,
      loading: false,
      ruleForm: {},
      rules: {
        newpassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 100,
            message: "长度在 6 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
      user: {},
    };
  },
  computed: {
    dialogTitle() {
      return `修改密码`;
    },
  },
  methods: {
    query(user) {
      const that = this;
      that.user = user;
      that.ruleForm = {};
      that.visible = true;
      that.loading = false;
    },
    handleOk() {
      const that = this;
      that.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let params = { ...that.ruleForm, userid: that.user.id };
          that.loading = true;
          usetResetPassword(params)
            .then((res) => {
              if (+res.code === 200) {
                that.$message.info(res.message);
                that.$emit("ok");
              }
            })
            .catch((err) => {
              that.$message.info(err.message);
            })
            .finally(() => {
              that.visible = false;
              that.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCancel() {
      this.form = {};
      this.visible = false;
    },
  },
};
</script>

<style></style>
