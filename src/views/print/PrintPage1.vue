<template>
  <div class="print-page print-page-1">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      size="mini"
    >
      <div class="" v-for="(c, idx) in current.components" :key="idx">
        <el-form-item label=""  v-if="c.type === 'input' || c.type === 'select'">
          <el-input
           
            v-model="c.val"
            :style="{
              width: `${c.w}px`,
              height: `${c.h}px`,
              position: 'absolute',
              top: `${c.top}px`,
              left: `${c.left}px`,
            }"
          ></el-input>
        </el-form-item>

        <el-form-item label=""  v-if="c.type === 'date' && !Array.isArray(c.components)">
          <el-date-picker
            type="date"
            format="yyyy 年 HH 月 DD 日"
            v-model="c.val"
            :style="{
              width: `${c.w}px`,
              height: `${c.h}px`,
              position: 'absolute',
              top: `${c.top}px`,
              left: `${c.left}px`,
            }"
          ></el-date-picker>
        </el-form-item>

        <div v-if="c.type === 'date-range'">
          <el-form-item label="" v-for="start in c.start.components">
            <el-date-picker
              v-if="start.type === 'year'"
              type="date"
              format="yyyy 年 HH 月 DD 日"
              v-model="start.val"
              :style="{
                width: `${start.w}px`,
                height: `${start.h}px`,
                position: 'absolute',
                top: `${start.top}px`,
                left: `${start.left}px`,
              }"
            ></el-date-picker>

            <el-input
              v-else
              v-model="start.val"
              :disabled="true"
              :style="{
                width: `${start.w}px`,
                height: `${start.h}px`,
                position: 'absolute',
                top: `${start.top}px`,
                left: `${start.left}px`,
              }"
            ></el-input>
          </el-form-item>

          <el-form-item label="" v-for="end in c.end.components">
            <el-date-picker
              v-if="end.type === 'year'"
              type="date"
              format="yyyy 年 HH 月 DD 日"
              v-model="end.val"
              :style="{
                width: `${end.w}px`,
                height: `${end.h}px`,
                position: 'absolute',
                top: `${end.top}px`,
                left: `${end.left}px`,
              }"
            ></el-date-picker>

            <el-input
              v-else
              v-model="end.val"
              :disabled="true"
              :style="{
                width: `${end.w}px`,
                height: `${end.h}px`,
                position: 'absolute',
                top: `${end.top}px`,
                left: `${end.left}px`,
              }"
            ></el-input>
          </el-form-item>

        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import printMetaData from "./pages";
export default {
  name: "",
  data() {
    return {
      pages: printMetaData.pages,
      current: {},
      ruleForm: {},
      rules:{}
    };
  },
  created() {
    this.current = this.pages[0];
  },
};
</script>

<style lang="scss" scoped>
.print-page {
  position: relative;
  width: 864px;
  height: 624px;
  background: #fff url(http://81.68.204.177/img/1-1.png) no-repeat center center;
}

.print-page-1{
  background: #fff url('~@/assets/print-images/1-1.png') no-repeat center center;
}
</style>
