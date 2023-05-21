<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    :modal="false"
    :close-on-click-modal="false"
    width="600px"
    v-loading="loading"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item
        label="字典项名称"
        :label-width="formLabelWidth"
        prop="item_text"
      >
        <el-input v-model="form.item_text" placeholder="字典项名称"></el-input>
      </el-form-item>
      <el-form-item
        label="字典项编码"
        :label-width="formLabelWidth"
        prop="item_value"
      >
        <el-input v-model="form.item_value" placeholder="字典项编码"></el-input>
      </el-form-item>
      <el-form-item
        label="字典项序号"
        :label-width="formLabelWidth"
        prop="sort_order"
        required
      >
        <el-input v-model="form.sort_order" placeholder="填写数字"></el-input>
      </el-form-item>
      <el-form-item label="字典项备注" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.description"
          placeholder="字典项备注"
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
import { dictItemAdd, dictItemEdit } from "@/api/dict";
export default {
  name: "dict-item-module",
  data() {
    var validateSortOrder = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入字典项序号"));
      } else if (!/^\d+$/.test(value)) {
        callback(new Error("字典项序号必须为数字"));
      } else {
        callback();
      }
    };

    return {
      visible: false,
      loading: false,
      formLabelWidth: "120px",
      form: {},
      rules: {
        item_text: [
          { required: true, message: "请输入字典项名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        item_value: [
          { required: true, message: "请输入字典项编码", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        sort_order: [{ validator: validateSortOrder, trigger: "blur" }],
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
      return `${title}字典项`;
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
          let api = that.isAdd ? dictItemAdd : dictItemEdit;
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
