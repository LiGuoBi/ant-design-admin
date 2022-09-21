<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { notification, message } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import { UserLoginParams } from '@/api/sys/types/user';
  const userStore = useUserStore();

  const loading = ref(false);
  const formState = reactive<UserLoginParams>({
    account: 'admin',
    pwd: '12345678',
  });

  const onFinish = (values: any) => {
    // console.log('Success:', values);
    loading.value = true;
    userStore
      .login(values)
      .then((res) => {
        // 刷新页面，通过路由守卫重定向到首页
        window.location.reload();
        setTimeout(() => {
          notification.success({
            message: '登录成功',
            description: `欢迎回来: ${res.data.name}`,
            duration: 2,
          });
        }, 1000);
      })
      .catch((err: ResponseResult) => {
        message.error(err.message);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
</script>

<template>
  <div class="account-root">
    <div class="account-root-item">
      <div class="account-root-item-img">
        <img src="@/assets/images/login-bg.svg" />
      </div>
    </div>
    <div class="account-root-item root-right-item">
      <div class="account-form">
        <div class="account-top">登录</div>

        <a-form :model="formState" ref="formRef" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item name="account" :rules="[{ required: true, message: '请输入账号!' }]">
            <a-input v-model:value="formState.account" size="large" placeholder="请输入账号">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="pwd" :rules="[{ required: true, message: '请输入密码!' }]">
            <a-input-password v-model:value="formState.pwd" size="large" placeholder="请输入密码">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block size="large" html-type="submit" :loading="loading">
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .account-root {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: 100vh;
    justify-content: center;
  }

  .account-root-item {
    box-sizing: border-box;
    margin: 0;
    flex-direction: row;
    flex-basis: 100%;
    flex-grow: 0;
    max-width: 100%;
    background: #2d8cf0;
  }

  .account-root-item-img {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .account-root-item-img img {
    width: 70%;
    display: inline-block;
    margin: 0 auto;
  }

  .account-root .root-right-item {
    background: #fff;
    box-sizing: border-box;
    flex-flow: row wrap;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .account-root .root-right-item .account-form {
    flex-basis: 45%;
    flex-grow: 0;
    max-width: 45%;
  }

  .account-root .root-right-item .account-form .account-top {
    font-size: 20px;
    margin: 20px 0;
  }

  .account-root .root-right-item .account-form .account-top-logo {
    text-align: center;
  }

  .account-root .root-right-item .account-form .account-top-logo img {
    width: 100%;
    margin: 0 auto;
  }

  .account-root .root-right-item .account-form .account-top-desc {
    font-size: 14px;
    color: #808695;
  }

  @media (min-width: 600px) {
    .account-root-item {
      flex-basis: 100%;
      flex-grow: 0;
      max-width: 100%;
    }
  }

  @media (min-width: 320px) {
    .account-root .root-right-item .account-form {
      flex-basis: 60%;
      flex-grow: 0;
      max-width: 60%;
    }
  }

  @media (min-width: 1200px) {
    .account-root-item {
      flex-basis: 50%;
      flex-grow: 0;
      max-width: 50%;
    }

    .account-root .root-right-item .account-form {
      flex-basis: 45%;
      flex-grow: 0;
      max-width: 45%;
    }
  }

  .login-tabs .ant-tabs-bar .ant-tabs-nav-container .ant-tabs-nav-wrap {
    text-align: center;
  }
</style>
