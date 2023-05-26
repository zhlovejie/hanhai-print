<template>
  <el-dialog
    title="日期选择器"
    :visible.sync="visible"
    width="600px"
    :close-on-click-modal="false"
    v-loading="dateLoading"
  >
    <div class="date-select-wrapper">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="ruleForm"
        size="small"
      >

      <el-form-item label="填充年月日(例如：2022-12-31)">
          <el-col :span="20">
            <el-form-item>
              <el-date-picker
                type="date"
                value-format="yyyy年MM月dd日"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" @click="handleOk({type: 'date-val',key: 'date5'}) " >确定</el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="填充年月日(例如：2022-12-31)">
          <el-col :span="20">
            <el-form-item>
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" @click="handleOk({type: 'date',key: 'date1'}) " >确定</el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="填充范围年月日(例如：2022-12-31 至 2023-12-31)">
          <el-col :span="20">
            <el-form-item>
              <el-date-picker
                v-model="ruleForm.date2"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :unlink-panels="true"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" @click="handleOk({type: 'daterange',key: 'date2'}) " >确定</el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="填充年份(例如：2022)">
          <el-col :span="20">
            <el-form-item>
              <el-date-picker
                v-model="ruleForm.date3"
                type="year"
                value-format="yyyy"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" @click="handleOk({type: 'year',key: 'date3'}) " >确定</el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="填充月份(例如：12)">
          <el-col :span="20">

            <el-date-picker
                v-model="ruleForm.date4"
                type="month"
                value-format="MM"
                style="width: 100%"
              ></el-date-picker>

          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" @click="handleOk({type: 'month',key: 'date4'}) " >确定</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
/**
 * 日期选择器
 */
export default {
  name: "date-select",
  data() {
    let fillMonths = () => {
      let options = [];
      for (let i = 0; i < 12; i++) {
        options.push({
          label: `${i + 1}月`,
          value: `${i + 1}`,
        });
      }
      return options;
    };
    return {
      dateLoading: false,
      visible: true,
      input: {},
      ruleForm: {},
      rules: {},
      options: fillMonths(),
    };
  },
  created() {},
  methods: {
    query(input) {
      this.visible = true;
      this.input = input;
      this.loadData();
    },
    loadData() {},
    handleDictItemClick(item) {
      this.$emit("select", {
        input: this.input,
        output: item.item_text,
      });
      this.visible = false;
    },
    handleOk({ type, key }) {
      console.log(type, key, this.ruleForm[key]);


      this.$emit("select", {
        input: this.input,
        output: {
          type,
          value:this.ruleForm[key]
        },
      });
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.date-select-wrapper {
  .ruleForm {
    ::v-deep .el-form-item {
      display: flex;
      flex-direction: column;
      .el-form-item__label {
        float: none;
        text-align: left;
      }
    }
  }
}
</style>
