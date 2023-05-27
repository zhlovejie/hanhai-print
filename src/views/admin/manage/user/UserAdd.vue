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
      <el-form-item label="用户账号" prop="username">
        <el-input
          v-model="ruleForm.username"
          :disabled="isEdit"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password" v-if="isAdd">
        <el-input
          v-model="ruleForm.password"
          maxlength="50"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input
          v-model="ruleForm.realname"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="ruleForm.phone"
          maxlength="11"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="ruleForm.email"
          maxlength="80"
          show-word-limit
        ></el-input>
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

      <el-form-item label="头像">
        <UploadImage v-model="ruleForm.avatar"></UploadImage>
      </el-form-item>

      <el-form-item label="账号状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">冻结</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="删除状态" prop="del_flag">
        <el-radio-group v-model="ruleForm.del_flag">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">删除</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="账号类型" prop="user_identity">
        <el-radio-group v-model="ruleForm.user_identity">
          <el-radio :label="1">管理员</el-radio>
          <el-radio :label="2">运营人员</el-radio>
          <el-radio :label="3">正式客户</el-radio>
          <el-radio :label="4">试用客户</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="试用次数"
        prop="trial_times"
        v-if="+ruleForm.user_identity === 4"
      >
        <el-input-number
          v-model="ruleForm.trial_times"
          :min="1"
          :max="1000"
          label="试用次数"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleCancel">取 消</el-button>
      <el-button size="small" type="primary" @click="handleOk">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import UploadImage from "@/components/common/UploadImage";
import { userAdd, userEdit } from "@/api/user";
export default {
  name: "user-add-module",
  components: {
    UploadImage,
  },
  data() {
    return {
      visible: false,
      loading: false,
      ruleForm: {
        status: 1,
        del_flag: 0,
        user_identity: 4,
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 100,
            message: "长度在 6 到 100 个字符",
            trigger: "blur",
          },
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        trial_times: [
          { required: true, message: "请输入试用次数", trigger: "blur" },
        ],
      },
      type: "add",
      record: {},
    };
  },
  computed: {
    isView() {
      return this.type === "view";
    },
    isAdd() {
      return this.type === "add";
    },
    isEdit() {
      return this.type === "edit";
    },
    dialogTitle() {
      let title = this.isView ? "查看" : this.isAdd ? "新增" : "编辑";
      return `${title}用户`;
    },
  },
  methods: {
    query(type, record = {}) {
      const that = this;
      that.type = type;
      that.record = record;
      that.ruleForm = record;
      that.visible = true;
      that.loading = false;
    },
    handleOk() {
      const that = this;
      if (that.isView) {
        that.visible = false;
        return;
      }

      that.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let api = that.isAdd ? userAdd : userEdit;
          let params = { ...that.ruleForm };
          if (that.isEdit) {
            params.id = that.record.id;
          }
          that.loading = true;
          api(params)
            .then((res) => {
              if(+res.code === 200){
                that.$message.info(res.message)
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
