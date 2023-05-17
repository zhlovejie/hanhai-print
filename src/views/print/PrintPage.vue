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


import Page1BgImg from "@/assets/print-images/1-1.png"
import Page2BgImg from "@/assets/print-images/1-2.png"
import Page3BgImg from "@/assets/print-images/1-3.png"
import Page4BgImg from "@/assets/print-images/1-4.png"

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
          img:Page1BgImg
        },
        {
          label: "版面二",
          name: "page-2",
          page: Page2Data,
          img:Page2BgImg
        },
        {
          label: "版面三",
          name: "page-3",
          page: Page3Data,
          img:Page3BgImg
        },
        {
          label: "版面四",
          name: "page-4",
          page: Page4Data,
          img:Page4BgImg
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

    window.getLodop = PrintInstance.getLodop
    window.loadCLodop = PrintInstance.loadCLodop
    window.CheckIsInstall = PrintInstance.CheckIsInstall
    setTimeout(function () {
      console.log(PrintInstance.getLodop());
      loadingInstance1.close();
    }, 2000);
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handlePrint() {
      const that = this

      let codeStr = ''
      let code = []

      let tab = that.tabList.find(tag => tag.name === that.activeName)
      let pageComponents = tab.page.components
      codeStr = `
        LODOP = window.getLodop();
        LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
        LODOP.PRINT_INITA(0,0,864,624,"111");
        LODOP.SET_SHOW_MODE("BKIMG_WIDTH", "228.6mm");
        LODOP.SET_SHOW_MODE("BKIMG_HEIGHT", "165.1mm");

        LODOP.ADD_PRINT_SETUP_BKIMG(
          "<img border='0' src='${tab.img}'>"
        );
        LODOP.SET_SHOW_MODE("DESIGN_IN_BROWSE", 1);
        LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
        LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);
        LODOP.SET_SHOW_MODE("LANGUAGE", 0);
      `

      pageComponents.map(c => {
        code.push(`LODOP.ADD_PRINT_TEXT(${c.top},${c.left},${c.w},${c.h},"${c.val}");`)
        if(c.ext && c.ext.cmd && Array.isArray(c.ext.cmd) && c.ext.cmd.length > 0){
          c.ext.cmd.map(cmdStr => {
            code.push(cmdStr)
          })
        }
      })

      codeStr += code.join('\n')

      codeStr += ' LODOP.PRINT_SETUP(); '


      that.$nextTick(() => {
        eval(codeStr)
      })


    },
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
