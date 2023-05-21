<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    width="600px"
    :close-on-click-modal="false"
    v-loading="loading"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item
        label="字典名称"
        :label-width="formLabelWidth"
        prop="dict_name"
      >
        <el-input v-model="form.dict_name" placeholder="字典名称"></el-input>
      </el-form-item>
      <el-form-item
        label="字典编码"
        :label-width="formLabelWidth"
        prop="dict_code"
      >
        <el-input v-model="form.dict_code" placeholder="字典编码"></el-input>
      </el-form-item>
      <el-form-item label="字典备注" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.description"
          placeholder="字典备注"
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
import { dictAdd, dictEdit } from "@/api/dict";
export default {
  name: "dict-module",
  data() {
    return {
      visible: false,
      loading: false,
      formLabelWidth: "120px",
      form: {},
      rules: {
        dict_name: [
          { required: true, message: "请输入字典名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        dict_code: [
          { required: true, message: "请输入字典编码", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
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
      return `${title}字典`;
    },
  },
  methods: {
    query(type, record = {}) {
      const that = this;
      that.type = type;
      that.record = record;
      that.form = record;
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
          let api = that.isAdd ? dictAdd : dictEdit;
          let params = { ...that.form };
          if (that.isEdit) {
            params.id = that.record.id;
          }
          that.loading = true;
          api(params)
            .then((res) => {
              console.log(res);
              that.$emit("ok");
            })
            .catch((err) => {
              that.$message.info(err.message)
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
