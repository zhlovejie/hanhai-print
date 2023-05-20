<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" v-loading="loading">
    <el-form :model="form">
      <el-form-item label="字典名称" :label-width="formLabelWidth">
        <el-input v-model="form.dict_name" placeholder="字典名称"></el-input>
      </el-form-item>
      <el-form-item label="字典编码" :label-width="formLabelWidth">
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
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
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
      loading:false,
      formLabelWidth: "120px",
      form: {},
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
      that.visible = true
      that.loading = false 
    },
    handleOk() {
      const that = this;
      if (that.isView) {
        that.visible = false;
        return;
      }
      let api = that.isAdd ? dictAdd : dictEdit;
      let params = { ...that.form };
      if (that.isEdit) {
        params.id = that.record.id;
      }
      that.loading = true
      api(params)
        .then((res) => {
          console.log(res);
          that.$emit('ok')
        })
        .catch((err) => {}).finally(() => {
          that.visible = false
          that.loading = false
        })
    },
    handleCancel() {
      that.form = {};
      that.visible = false;
    },
  },
};
</script>

<style></style>
