<template>
  <div class="login-container" ref="loginContainer">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h2 class="sub-title">欢迎使用</h2>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          :maxLength="50"
          prefix-icon="el-icon-user"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          :maxLength="50"
          @keyup.enter.native="handleLogin"
          prefix-icon="el-icon-lock"
          show-password
        />
      </el-form-item>

      <el-form-item prop="code">
        <el-col :span="11">
          <el-input
            ref="code"
            v-model="loginForm.captchaText"
            placeholder="验证码"
            name="code"
            type="text"
            tabindex="3"
            auto-complete="on"
            :maxLength="6"
            prefix-icon="el-icon-lock"
          />
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
          <div
            class="captcha-wrapper"
            @click="handleCaptchaClick"
            title="刷新验证码"
            v-html="loginForm.captchaImage"
          ></div>
        </el-col>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
    <div class="footer-wrapper">
      <div class="copyright">
        Copyright © 2014-2023 徐州瀚海网络科技有限公司版权所有
      </div>
    </div>
  </div>
</template>

<script>
import { captchaRandom, captchaValidate } from "@/api/user";
import IconLogo from "@/assets/logo/logo.png";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不少于6位"));
      } else {
        callback();
      }
    };

    const validateCode = (rule, value, callback) => {
      let _value = this.loginForm.captchaText;
      if (!_value) {
        callback(new Error("请输入验证码"));
      } else if (_value.length < 4) {
        callback(new Error("验证码不少于4位"));
      } else {
        callback();
      }
    };
    return {
      IconLogo,
      loginForm: {
        username: "",
        password: "",
        captchaImage: "",
        captchaText: "",
        captchaSalt: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        code: [{ required: true, trigger: "blur", validator: validateCode }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const that = this;
        that.redirect = route.query && route.query.redirect;
        that.refreshCaptcha();
      },
      immediate: true,
    },
  },
  mounted() {
    const that = this;
    window.addEventListener("keydown", that.handleEnterKey, true);

    that.$nextTick(() => {
      const pattern = trianglify({
        width: window.innerWidth,
        height: window.innerHeight,
        cellSize:parseInt(window.innerWidth / 20)
      });
      let bgCanvas = pattern.toCanvas();
      bgCanvas.classList.add("login-container-bg-wrapper");
      that.$refs.loginContainer.appendChild(bgCanvas);
    });
  },
  methods: {
    handleEnterKey(event) {
      const that = this;
      if (event.defaultPrevented) {
        return; // 如果已取消默认操作，则不应执行任何操作
      }
      var handled = false;
      if (event.key !== undefined && event.key === "Enter") {
        handled = true;
        that.handleLogin();
      } else if (event.keyCode !== undefined && event.keyCode === 13) {
        handled = true;
        that.handleLogin();
      }
      if (handled) {
        event.preventDefault();
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      const that = this;
      that.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          let { captchaText, captchaSalt } = that.loginForm;
          let isok = await captchaValidate({
            captchaText,
            captchaSalt,
          }).then((res) => res.result);

          if (!isok) {
            that.$message.error("验证码不正确");
            return;
          }

          that.loading = true;
          that.$store
            .dispatch("user/login", that.loginForm)
            .then(() => {
              that.$router.push({ path: that.redirect || "/" });
              that.loading = false;
            })
            .catch((err) => {
              that.$message.error(err.message);
              that.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    refreshCaptcha() {
      const that = this;
      captchaRandom().then((res) => {
        if (+res.code === 200) {
          let { base64, salt } = res.result;
          that.loginForm = {
            ...that.loginForm,
            captchaImage: base64,
            captchaSalt: salt,
          };
        }
      });
    },
    handleCaptchaClick() {
      this.refreshCaptcha();
    },
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleEnterKey, true);
  },
};
</script>

<style lang="scss" scoped>
$bg: #283443;
.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  min-width: 1000px;
  .login-form {
    width: 520px;
    position: absolute;
    top: 135px;
    left: 50%;
    margin-left: -260px;

    max-width: 100%;
    padding: 40px 40px 30px;
    border-radius: 10px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);

    .sub-title {
      text-align: center;
      font-size: 28px;
      line-height: 28px;
      color: #fff;
      font-weight: 400;
      letter-spacing: 5px;
    }

    .captcha-wrapper {
      height: 40px;
      position: relative;
      top: -20px;
      left: 40px;
      cursor: pointer;
      ::v-deep svg {
        width: 100%;
        height: auto;
      }
    }
  }

  .title-container {
    position: absolute;
    top: 30px;
    left: 50px;
    width: 96px;
    height: auto;
    h3 {
      text-align: center;
    }
  }

  .footer-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
  }

  ::v-deep .login-container-bg-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>
