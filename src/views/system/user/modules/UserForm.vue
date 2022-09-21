<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue';
  import { message } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import _ from 'lodash';

  export default defineComponent({
    // 自定义事件
    emits: ['success'],
    setup(props, { emit }) {
      const state = reactive({
        visible: false,
        loading: false,
        id: 0,
      });

      const formRef = ref<FormInstance>();
      const formState = reactive<any>({
        name: '',
        account: '',
        password: '',
        mobile: '',
        roleId: '',
        useFlag: '1',
      });

      const add = () => {
        state.visible = true;
        state.id = 0;
      };
      const edit = (data: any) => {
        state.visible = true;
        Object.assign(formState, _.pick(data, _.keys(formState)));
      };

      const close = () => {
        state.visible = false;
        // 重置表单
        formRef.value?.resetFields();
      };

      const handleSubmit = () => {
        formRef.value
          ?.validate()
          .then(() => {
            state.loading = true;
            // const params = { ...toRaw(formState) };
            const params = { ...formState };
            if (state.id !== 0) {
              params.id = state.id;
            }
            setTimeout(() => {
              state.loading = false;
              message.success(`${state.id === 0 ? '添加' : '编辑'}成功`);
            }, 2000);

            // apiFu(params)
            //   .then(() => {
            //     message.success(`${state.id === 0 ? '添加' : '编辑'}成功`);
            //     closeDrawer();
            //     emit('success');
            //   })
            //   .catch(() => {})
            //   .finally(() => {
            //     state.loading = false;
            //   });
          })
          .catch((error) => {
            console.log('error', error);
          });
      };

      return {
        ...toRefs(state),
        formRef,
        formState,
        add,
        edit,
        close,
        handleSubmit,
      };
    },
  });
</script>

<template>
  <a-modal
    :title="`${id === 0 ? '新增' : '编辑'}用户`"
    :visible="visible"
    :width="620"
    :confirmLoading="loading"
    :centered="false"
    @cancel="close"
    @ok="handleSubmit"
  >
    <div class="max-h-[60vh] overflow-y-auto">
      <a-spin :spinning="loading">
        <a-form
          :model="formState"
          ref="formRef"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 17 }"
        >
          <a-form-item
            label="用户名称"
            name="name"
            :rules="[{ required: true, message: '用户名称必填' }]"
          >
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item
            label="账号"
            name="account"
            :rules="[{ required: true, message: '账号必填' }]"
          >
            <a-input v-model:value="formState.account" />
          </a-form-item>
          <a-form-item
            label="联系电话"
            name="mobile"
            :rules="[{ required: true, message: '联系电话必填' }]"
          >
            <a-input v-model:value="formState.mobile" />
          </a-form-item>
          <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: '密码必填' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item
            label="角色状态"
            name="useFlag"
            :rules="[{ required: true, message: '角色状态必填' }]"
          >
            <a-radio-group v-model:value="formState.useFlag" button-style="solid">
              <a-radio-button value="1">正常</a-radio-button>
              <a-radio-button value="0">暂停</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
  </a-modal>
</template>
