<template>
  <div class="print-wrapper">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        :label="tab.label"
        :name="tab.name"
        v-for="tab in tabList"
        :key="tab.name"
      >
        <div :class="{ 'print-page': true, [tab.name]: true }">
          <div class="" v-for="(c, idx) in tab.page.components" :key="idx">
            <el-input
              v-if="c.h <= 20"
              size="mini"
              v-model="c.val"
              :style="{
                width: `${c.w}px`,
                height: `${c.h}px`,
                position: 'absolute',
                top: `${c.top}px`,
                left: `${c.left}px`,
              }"
            />

            <el-input
              v-else
              type="textarea"
              size="mini"
              v-model="c.val"
              :style="{
                width: `${c.w}px`,
                height: `${c.h}px`,
                position: 'absolute',
                top: `${c.top}px`,
                left: `${c.left}px`,
              }"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="btn-wrapper">
      <el-button type="primary" @click="handlePrint">打印此页</el-button>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import PrintInstance from "@/utils/LodopFuncs.js";

import Page1Data from "./pages/page1";
import Page2Data from "./pages/page2";
import Page3Data from "./pages/page3";
import Page4Data from "./pages/page4";
export default {
  name: "",
  data() {
    return {
      activeName: "",
      tabList: [
        {
          label: "版面一",
          name: "page-1",
          page: Page1Data,
        },
        {
          label: "版面二",
          name: "page-2",
          page: Page2Data,
        },
        {
          label: "版面三",
          name: "page-3",
          page: Page3Data,
        },
        {
          label: "版面四",
          name: "page-4",
          page: Page4Data,
        },
      ],
      loading: false,
    };
  },
  mounted() {
    const that = this;
    that.activeName = that.tabList[0].name;

    let loadingInstance1 = Loading.service({
      fullscreen: true,
      text: "系统正在检测打印插件...",
      lock: true,
    });

    PrintInstance.loadCLodop();

    setTimeout(function () {
      console.log(PrintInstance.getLodop());
      loadingInstance1.close();
    }, 2000);
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handlePrint() {},
  },
};
</script>

<style lang="scss" scoped>
.print-wrapper {
  padding: 20px;
  .print-page {
    position: relative;
    width: 864px;
    height: 624px;
    ::v-deep {
      .el-input--mini {
        font-size: 12px;
      }
      .el-input__inner,
      .el-textarea__inner {
        padding: 0;
        height: 20px;
        line-height: 20px;
        border: none;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 0;
        resize: none;
      }

      .el-textarea__inner {
        line-height: 16px;
        height: 100%;
      }
    }
  }

  .page-1 {
    background: #fff url("~@/assets/print-images/1-1.png") no-repeat center
      center;
  }
  .page-2 {
    background: #fff url("~@/assets/print-images/1-2.png") no-repeat center
      center;
  }
  .page-3 {
    background: #fff url("~@/assets/print-images/1-3.png") no-repeat center
      center;
  }
  .page-4 {
    background: #fff url("~@/assets/print-images/1-4.png") no-repeat center
      center;
  }

  .btn-wrapper {
    width: 864px;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
