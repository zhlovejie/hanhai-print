<template>
  <div class="print-wrapper">
    <div class="tips">
      <el-alert
        style="margin-bottom: 20px"
        title="使用说明"
        type="info"
        show-icon
      >
        <div>
          <p>1.手动输入方式，点击输入框后输入数据即可。</p>
          <p>2.选择数据方式，双击输入框后弹出数据选择器，选择数据即可。</p>
        </div>
      </el-alert>
    </div>

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        :label="tab.label"
        :name="tab.name"
        v-for="tab in tabList"
        :key="tab.name"
      >
        <div :class="{ 'print-page': true, [tab.name]: true }">
          <div class="" v-for="c in tab.page.components" :key="c.key">
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
              @dblclick.native="handleSelectValue($event, c)"
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
              @dblclick.native="handleSelectValue($event, c)"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="btn-wrapper">
      <el-button type="primary" @click="handlePrint">打印此页</el-button>
    </div>

    <DictSelect ref="dictSelect" @select="handleDictSelect" />

    <!-- <DateSelect ref="dateSelect" @select="handleDateSelect"/> -->
  </div>
</template>

<script>
import { Loading } from "element-ui";
import PrintInstance from "@/utils/LodopFuncs.js";

import Page1BgImg from "@/assets/print-images/1-1-new.png";
import Page2BgImg from "@/assets/print-images/1-2.png";
import Page3BgImg from "@/assets/print-images/1-3.png";
import Page4BgImg from "@/assets/print-images/1-4.png";

import Page1Data from "./pages/page1";
import Page2Data from "./pages/page2";
import Page3Data from "./pages/page3";
import Page4Data from "./pages/page4";

import DictSelect from "@/components/common/DictSelect";
// import DateSelect from "@/components/common/DateSelect";

import { uuid } from "@/utils/index";
import { udpateTrialUsed, checkTrial } from "@/api/user";
import { printLogAdd } from "@/api/print";

export default {
  name: "print-page",
  components: { DictSelect },
  data() {
    let _Page1Data = { ...Page1Data };
    _Page1Data.components = _Page1Data.components.map((c) => {
      c.key = uuid(32);
      return c;
    });

    let _Page2Data = { ...Page2Data };
    _Page2Data.components = _Page2Data.components.map((c) => {
      c.key = uuid(32);
      return c;
    });

    let _Page3Data = { ...Page3Data };
    _Page3Data.components = _Page3Data.components.map((c) => {
      c.key = uuid(32);
      return c;
    });

    let _Page4Data = { ...Page4Data };
    _Page4Data.components = _Page4Data.components.map((c) => {
      c.key = uuid(32);
      return c;
    });

    return {
      activeName: "page-1",
      tabList: [
        {
          label: "版面一",
          name: "page-1",
          page: _Page1Data,
          img: Page1BgImg,
        },
        {
          label: "版面二",
          name: "page-2",
          page: _Page2Data,
          img: Page2BgImg,
        },
        {
          label: "版面三",
          name: "page-3",
          page: _Page3Data,
          img: Page3BgImg,
        },
        {
          label: "版面四",
          name: "page-4",
          page: _Page4Data,
          img: Page4BgImg,
        },
      ],
      loading: false,
    };
  },
  async mounted() {
    const that = this;

    let isTrialEnd = await checkTrial()
      .then((res) => res.result.end)
      .catch((err) => {
        console.log(err);
      });
    if (+isTrialEnd === 1) {
      that.$message.info(
        `您的试用次数已经使用完了，请联系管理员延长试用或升级为正式客户！`
      );
      setTimeout(function () {
        that.$router.push({ name: "dashboard" });
      }, 5000);
      return;
    }

    that.activeName = that.tabList[0].name;

    let loadingInstance1 = Loading.service({
      fullscreen: true,
      text: "系统正在检测打印插件...",
      lock: true,
    });

    PrintInstance.loadCLodop();

    function checkPrintStatus() {
      let fnresolve = null;
      let p = new Promise((resolve) => {
        fnresolve = resolve;
      });
      let timer = null,
        now = Date.now(),
        wait = 20;

      let check = () => {
        timer = setTimeout(function () {
          console.log("check....");
          let diff = (Date.now() - now) / 1000 >= wait;
          if (diff) {
            clearTimeout(timer);
            fnresolve("timeout");
          }
          if (PrintInstance.isPrintJsLoaded()) {
            clearTimeout(timer);
            fnresolve("over");
          } else {
            check();
          }
        }, 500);
      };

      check();

      return p;
    }

    await checkPrintStatus().then((res) => console.log(res));
    loadingInstance1.close();

    const LODOP = PrintInstance.getLodop();
    if (!LODOP) {
      let html = `
        <div>
          <p>Web打印服务CLodop未安装启动，点击这里<a style="color:red;font-weight:700;" href='/static/CLodop_Setup_for_Win32NT.zip' target='_self' rel="external nofollow">下载执行安装</a>。</p>
          <p>若此前已安装过，可<a href='CLodop.protocol:setup' target='_self' style="color:red;font-weight:700;">点这里直接再次启动</a></p>
          <p>成功后请刷新本页面或重启浏览器。 </p>
        </div>
      `;
      that.$alert(html, "提示", { dangerouslyUseHTMLString: true });
    }

    // LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
    // LODOP.On_Return=function(TaskID2,value1){
    //   console.log(arguments)
    // };

    window.__LODOP_PRINT_STATUS = function (TaskID, value) {
      console.log(arguments);
      udpateTrialUsed()
        .then()
        .catch((err) => {
          console.log(err);
        });
      that.addPrintLog();

      // setTimeout(() => {
      //   LODOP.GET_VALUE("PRINT_STATUS_EXIST",value)
      // }, 5000);

      // let c = 0,t = null
      // let check = function(){
      //   let val = LODOP.GET_VALUE("PRINT_STATUS_OK",value)
      //   let val2 = LODOP.GET_VALUE("PRINT_STATUS_EXIST",value)
      //   console.log(`PRINT_STATUS_OK:${val} PRINT_STATUS_EXIST:${val2}`)
      //   if (val) {
      //     clearInterval(t);
      //     c=0;
      //     console.log("打印成功！")
      //   }if ((!val2)&&(c>0)) {
      //     clearInterval(t);
      //     c=0;
      //     console.log("打印任务被删除！");
      //   } else if (c>30){
      //     clearInterval(t);
      //     c=0;
      //     console.log("打印超过30秒没捕获到成功状态！");
      //   };
      // }

      // t = setInterval(() => {
      //   c++
      //   check()
      // }, 1000);
    };
  },

  methods: {
    addPrintLog() {
      let tabList = [...this.tabList];
      let target = tabList.find((tab) => tab.name === this.activeName);
      if (target) {
        printLogAdd({ print_json: JSON.stringify(target) })
          .then()
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handlePrint() {
      const that = this;

      let codeStr = "";
      let code = [];

      let tab = that.tabList.find((tag) => tag.name === that.activeName);
      let pageComponents = tab.page.components;
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
      `;

      pageComponents.map((c) => {
        code.push(
          `LODOP.ADD_PRINT_TEXT(${c.top},${c.left},${c.w},${c.h},"${c.val}");`
        );
        if (
          c.ext &&
          c.ext.cmd &&
          Array.isArray(c.ext.cmd) &&
          c.ext.cmd.length > 0
        ) {
          c.ext.cmd.map((cmdStr) => {
            code.push(cmdStr);
          });
        }
      });

      codeStr += code.join("\n");

      codeStr += `LODOP.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);`;

      codeStr += `

        LODOP.On_Return_Remain=true;
        if (LODOP.CVERSION) {
          LODOP.On_Return = function(TaskID,Value){
            window.__LODOP_PRINT_STATUS(TaskID,Value)
          };
          LODOP.PRINT_SETUP();;
        } else {
          window.__LODOP_PRINT_STATUS(LODOP.PRINT_SETUP())
        };

      `;

      // codeStr += " LODOP.PRINT_SETUP(); ";

      that.$nextTick(() => {
        eval(codeStr);
      });
    },
    handleSelectValue(event, c) {
      const that = this;
      that.$refs.dictSelect.query({ target: c });
    },

    handleDictSelect({ input, output }) {
      // let target = input.target
      // let tab = that.tabList.find((tag) => tag.name === that.activeName);
      // let pageComponents = tab.page.components;

      // let component = pageComponents.find(c => c.key === target.key)
      // component.val = output

      input.target.val = output;
    },
    handleDateSelect({ input, output }) {},
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
    background: #fff url("~@/assets/print-images/1-1-new.png") no-repeat center
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
