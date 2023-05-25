<template>
  <div class="dashboard-container">
    <div class="custom-lock-screen-datetime-wrapper" v-if="timer">
      <div class="custom-lock-screen-time">{{ time }}</div>
      <div class="custom-lock-screen-date">{{ date }}</div>
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
    };
  },
  computed: {
    ...mapGetters(["name"]),
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

    .custom-lock-screen-datetime-wrapper {
      position: fixed;
      right: 50px;
      bottom: 100px;
      color: #fff;
      animation: lock-screen-datetime-show 3s linear;
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
