<template>
  <div class="dashboard-container">
    <div class="dashboard-container-main">
      <el-alert type="success" style="margin-bottom: 20px">
        <div>{{ realname || name }} 你好，欢迎回来！</div>
      </el-alert>

      <el-alert
        v-if="+role === 4"
        style="margin-bottom: 20px"
        title="提示"
        type="warning"
        show-icon
      >
        <div>
          <p>当前账号为试用客户，请联系管理员升级为正式客户！</p>
        </div>
      </el-alert>

      <el-card class="app-card-container" shadow="never">
        <div slot="header" class="clearfix">
          <span>快捷功能</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          > -->
        </div>
        <el-row :gutter="20" style="margin: -5px 0">
          <el-col
            :span="4"
            v-for="app in apps"
            style="padding-top: 10px; padding-bottom: 10px"
          >
            <div class="custom-app-box">
              <span
                :class="[
                  'custom-app-item',
                  `linear-gradient-${1 + Math.floor(Math.random() * 6)}`,
                ]"
                @click="handleAppClick(app)"
              >
                <div class="custom-app-item__icon">
                  <i :class="{ [app.icon]: true, 'app-icon': true }"></i>
                </div>
                <div class="custom-app-item__name">
                  {{ app.title }}
                </div>
              </span>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <div class="custom-lock-screen-datetime-wrapper" v-if="timer">
        <div class="custom-lock-screen-time">{{ time }}</div>
        <div class="custom-lock-screen-date">{{ date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
export default {
  name: "Dashboard",
  data() {
    return {
      date: null,
      time: null,
      timer: null,
      apps: [],
    };
  },
  computed: {
    ...mapGetters(["name", "realname", "role"]),
  },
  created() {
    const that = this;
    if (that.timer) {
      clearInterval(that.timer);
    }
    that.timer = setInterval(function () {
      that.date = parseTime(new Date(), "{m}月{dd}日，星期{a}");
      that.time = parseTime(new Date(), "{h}:{i}");
    }, 1000);

    this.apps = this.getRoutes();
  },
  methods: {
    getRoutes() {
      let routes = this.$router.options.routes;
      if ([3, 4].includes(this.role)) {
        routes = routes.filter((r) => !String(r.name).startsWith("admin"));
      }

      routes = routes.filter((r) => !r.hidden);

      let arr = [];
      let getNodes = function (nodeList) {
        for (let i = 0; i < nodeList.length; i++) {
          let r = nodeList[i];
          if (r && Array.isArray(r.children) && r.children.length > 0) {
            getNodes(r.children);
          } else {
            if (r.meta && r.name) {
              arr.push({
                title: r.meta.title,
                name: r.name,
                icon: r.meta.icon,
              });
            }
          }
        }
      };

      //获取子路由菜单
      getNodes(routes);
      //过滤工作台
      arr = arr.filter((r) => r.name !== "dashboard");

      return arr;
    },
    handleAppClick(app) {
      this.$router.push({ name: app.name, query: { t: Date.now() } });
    },
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    position: relative;
    margin: 30px;

    .dashboard-container-main {
      max-width: 1200px;

      ::v-deep .el-alert__title {
        font-size: 14px;
      }

      ::v-deep .el-alert__description {
        font-size: 14px;
      }
    }

    .app-card-container {
      .custom-app-box {
        position: relative;
        padding-top: 100%;
      }
      .custom-app-item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 6px 3px #eee;
        transition: all 0.3s ease;
        overflow: hidden;
        opacity: 0.7;
        cursor: pointer;

        &__icon {
          .app-icon {
            font-size: 36px;
            color: #fff;
          }
        }

        &__name {
          margin-top: 20px;
          color: #fff;
          font-size: 16px;
        }
      }

      .custom-app-item:hover {
        opacity: 1;
      }

      .linear-gradient-1 {
        background-image: linear-gradient(180deg, #15aff7, #1582f7);
      }

      .linear-gradient-2 {
        background-image: linear-gradient(180deg, #9280ea, #8c56ff);
      }

      .linear-gradient-3 {
        background-image: linear-gradient(180deg, #f7514b, #ed7248, #f8a261);
      }

      .linear-gradient-4 {
        background-image: linear-gradient(180deg, #59d4d8, #12d7b9);
      }

      .linear-gradient-5 {
        background-image: linear-gradient(180deg, #f878cf, #ff92da);
      }

      .linear-gradient-6 {
        background-image: linear-gradient(180deg, #ff7c43, #ffbb4f);
      }
      .linear-gradient-7 {
        background-image: linear-gradient(180deg, #3de1ff, #39a9ff);
      }
    }

    .custom-lock-screen-datetime-wrapper {
      position: fixed;
      right: 50px;
      bottom: 100px;
      color: #666;
      animation: lock-screen-datetime-show 2s linear;
      .custom-lock-screen-time {
        font-size: 160px;
      }
      .custom-lock-screen-date {
        font-size: 72px;
      }
    }
    @keyframes lock-screen-datetime-show {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
