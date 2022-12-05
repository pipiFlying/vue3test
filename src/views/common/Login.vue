<template>
  <div class="login">
    <div class="container">
      <div class="title">MAll COOK</div>
      <div class="content">
        <el-tabs v-model="loginMethod" class="login-tabs" @tab-click="checkMethod">
          <el-tab-pane label="验证码登录" name="sms">
            <div class="smsbox">
              <el-input class="common_input" v-model="formSms.account" placeholder="请输入手机号"></el-input>
              <el-input class="common_input" v-model="formSms.code" placeholder="请输入短信验证码">
                <template #append>
                  <el-button @click="sendCode"> {{ time && time !== 60 ? `${time}s` : '点击发送' }}</el-button>
                </template>
              </el-input>
              <el-button type="primary" class="submit" @click="submit">登录</el-button>
              <el-checkbox v-model="deal" label="隐私协议" size="large"></el-checkbox>
            </div>
          </el-tab-pane>
          <el-tab-pane label="密码登录" name="password">
            <div class="passwordbox">
              <el-input class="common_input" v-model="formPs.account" placeholder="请输入账号"></el-input>
              <el-input
                class="common_input"
                v-model="formPs.password"
                placeholder="请输入密码"
                show-password
              ></el-input>
              <div class="action">
                <el-checkbox v-model="rememberFlag" @change="remember" label="记住密码" size="large"></el-checkbox>
                <el-button type="primary" link>忘记密码?</el-button>
              </div>
              <el-button type="primary" class="submit" @click="submit">登录</el-button>
              <div class="action_bottom">
                <el-checkbox v-model="deal" label="隐私协议" size="large"></el-checkbox>
                <div class="register">
                  <span>没有账号?</span>
                  <el-button class="register_button" type="primary" link>注册账号</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, watch, Ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { getToken } from '@/api';

interface FormPs {
  account: string;
  password: string;
  imgverification: string;
}

interface FormSms {
  account: string;
  code: string;
}

const $router = useRouter();
const $store = useStore();

const { proxy }: any = getCurrentInstance();
const loginMethod: Ref<string> = ref('sms');
const rememberFlag: Ref<boolean> = ref(false);
const timer: Ref<number> = ref(0);
const time: Ref<number> = ref(60);
const deal: Ref<boolean> = ref(false);
const formSms: FormSms = reactive({ account: '', code: '' });
const formPs: FormPs = reactive({ account: '', password: '', imgverification: '' });

watch([time], () => {
  console.log(time.value);
  time.value <= 0 && clearTimer();
});

// watch([rememberFlag], () => {
//   remember();
// });

const checkMethod = () => {
  console.log(loginMethod, 'loginMethod');
};

const clearTimer = () => {
  clearInterval(timer.value);
  time.value = 60;
};
// 发送验证码;
const sendCode = () => {
  const { account } = formPs;
  if (account.length !== 11) {
    proxy.$message.info('请输入正确的手机号码');
    return;
  }
  if (time.value < 60 && timer.value > 0) {
    proxy.$message.info('操作频繁，请稍后再试');
    return;
  }
  timer.value = window.setInterval(() => {
    time.value -= 1;
  }, 1000);
};

// 记忆密码功能
const remember = () => {
  if (rememberFlag.value) {
    const obj = { ...formPs, checked: rememberFlag.value };
    const accountMsg = JSON.stringify(obj);
    localStorage.setItem('moke-account', accountMsg);
  } else {
    localStorage.removeItem('moke-account');
  }
};

const submit = async () => {
  if (loginMethod.value === 'sms') {
    const { account, code } = formSms;
    if (!account || account.length !== 11) {
      proxy.$message.error('请输入正确手机号');
      return false;
    }
    if (!code) {
      proxy.$message.error('请输入短信验证码');
      return false;
    }
    if (deal.value) {
      proxy.$message.error('请阅读并勾选隐私协议及隐私政策');
      return false;
    }
  } else {
    const { account, password, imgverification } = formPs;
    if (!account) {
      proxy.$message.error('请输入账号');
      return false;
    }
    if (!password) {
      proxy.$message.error('请输入密码');
      return false;
    }
    if (!imgverification) {
      // proxy.$message.error('请输入图形验证码');
      // return false;
    }
    if (!deal.value) {
      proxy.$message.error('请阅读并勾选隐私协议及隐私政策');
      return false;
    }
    const {
      data: { data, code }
    } = await getToken(formPs);
    if (code !== proxy.CODE_OK) return;
    $store.dispatch('SET_TOKEN', data.token);
    $router.push('/');
  }
};

onMounted(() => {
  const getAccount = localStorage.getItem('moke-account');
  if (!getAccount) return;
  const val = JSON.parse(getAccount);
  const { account, password, imgverification, checked } = val;
  formPs.account = account;
  formPs.password = password;
  formPs.imgverification = imgverification;
  rememberFlag.value = checked;
});
</script>

<style lang="less" scoped>
.login {
  background-image: url('@/assets/login-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  .container {
    position: absolute;
    right: 10%;
    top: 15%;
    .title {
      font-size: 25px;
      font-weight: 600;
      text-shadow: 0 0 5px grey;
    }
    .content {
      height: 400px;
      width: 350px;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 10px grey;
      margin-top: 15px;
      .login-tabs {
        ::v-deep .el-tabs {
          &__nav {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 350px;
            height: 50px;
          }
          &__item {
            font-weight: 600;
            font-size: 16px;
          }
          &__content {
            padding: 0 40px 0 40px;
            .smsbox {
              display: flex;
              flex-direction: column;
              .submit {
                width: 100%;
                margin-top: 20px;
              }
            }
            .passwordbox {
              display: flex;
              flex-direction: column;
              .action {
                display: flex;
                justify-content: space-between;
                align-content: center;
                &_bottom {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .register {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-size: 14px;
                    &_button {
                      padding: 0 2px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .common {
    &_input {
      margin-top: 20px;
      height: 35px;
    }
  }
}
</style>
