<template>
  <!-- <el-upload
    class="avatar-uploader"
    :action="actionUrl"
    :show-file-list="true"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload> -->

  <el-upload
    class="upload-demo"
    :headers="headers"
    :action="actionUrl"
    :on-change="handleChange"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    :file-list="fileList"
  >
    <el-tooltip content="只能上传xlsx/xls文件，且不超过5M" placement="top">
      <el-button size="small" type="primary">导入字典</el-button>
    </el-tooltip>
    <!-- <div slot="tip" class="el-upload__tip">只能上传xlsx/xls文件，且不超过5M</div> -->
  </el-upload>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: [String],
      required: false,
    },
  },
  data() {
    return {
      actionUrl: `${process.env.VUE_APP_BASE_API}/sys/dict/import`,
      imageUrl: "",
      fileList: [],
      headers: {
        "X-Access-Token": getToken(),
      },
    };
  },
  watch: {
    value: {
      handler(val) {},
      //立刻执行handler
      immediate: true,
    },
  },
  methods: {
    handleChange() {
      console.log(arguments);
    },
    handleSuccess(res) {
      if(+res.code === 200){
        this.$message.info('导入成功')
        this.$emit('ok')
      }else{
        this.$message.error(res.message)
      }
      console.log(arguments);
    },
    beforeUpload(file) {
      let fileTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];

      const isFile = fileTypes.includes(file.type);
      // const isFile2 = file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isFile) {
        this.$message.error("上传文件只能是 XLSX,XLS 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      return true;
    },
  },
};
</script>
<style>
.upload-demo .el-upload-list{
  display: none;
}
</style>
