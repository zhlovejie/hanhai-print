<template>
  <el-upload
    class="avatar-uploader"
    :action="actionUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
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
      actionUrl: "/sys/common/upload",
      imageUrl: "",
    };
  },
  watch: {
    value: {
      handler(val) {
        this.initFileList(val);
      },
      //立刻执行handler
      immediate: true,
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("change", this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const imagesTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      const isImg = imagesTypes.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImg) {
        this.$message.error("上传头像图片只能是 JPEG,JPG,PNG,GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImg && isLt2M;
    },
    initFileList(val) {
      this.imageUrl = val;
      this.$emit("change", this.imageUrl);
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
