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
      actionUrl: `${process.env.VUE_APP_BASE_API}/sys/common/upload`,
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
      // this.imageUrl = URL.createObjectURL(file.raw);
      if (+res.code === 200) {
        this.imageUrl = res.result;
        this.$emit("change", this.imageUrl);
      } else {
        this.$message.error(res.message);
      }
    },
    beforeAvatarUpload(file) {
      const imagesTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      const isImg = imagesTypes.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImg) {
        this.$message.error("上传头像图片只能是 JPEG,JPG,PNG,GIF 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      return this.compressPictures(file, 200, 200);
    },
    initFileList(val) {
      this.imageUrl = val;
      this.$emit("change", this.imageUrl);
    },
    compressPictures(file, _maxWidth = 200, _maxHeight = 200) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader(),
          img = new Image();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          img.src = e.target.result;
        };
        img.onload = function () {
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          let originWidth = this.width;
          let originHeight = this.height;
          let maxWidth = _maxWidth,
            maxHeight = _maxHeight;
          let targetWidth = originWidth,
            targetHeight = originHeight;
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              targetWidth = maxWidth;
              targetHeight = Math.round(
                maxWidth * (originHeight / originWidth)
              );
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(
                maxHeight * (originWidth / originHeight)
              );
            }
          }
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          context.clearRect(0, 0, targetWidth, targetHeight);
          context.drawImage(img, 0, 0, targetWidth, targetHeight);
          canvas.toBlob(
            (blob) => {
              let newFile = new File([blob], file.name, { type: file.type });
              //由于缺少uid 导致 上传文件列表 渲染失败
              newFile.uid = file.uid;
              resolve(newFile);
            },
            file.type,
            0.7
          );
        };
        img.onerror = function (err) {
          reject(err);
        };
      });
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
