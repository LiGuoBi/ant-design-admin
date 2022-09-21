<script setup lang="ts">
  import { ref, reactive, markRaw, onMounted } from 'vue';
  import { PlusOutlined, UpOutlined, DownOutlined } from '@ant-design/icons-vue';

  import UserForm from './modules/UserForm.vue';

  // 查询表单高级搜索 展开/关闭
  const queryFormExpand = ref(false);
  // 查询表单
  interface QueryParamType {
    name: string; // 用户名
    account: string; // 账号
    useFlag: string; // 状态 是否启用 1：启用；0：禁用
  }
  const defaultQueryParam = {
    name: '',
    account: '',
    useFlag: '',
  };

  const queryParam = reactive<QueryParamType>({ ...defaultQueryParam });

  // 表格
  const tableState = reactive<any>({
    // markRaw 标记一个对象，使其永远不会转换为 proxy。返回对象本身。
    columns: markRaw([
      {
        title: '角色ID',
        dataIndex: 'id',
      },
      {
        title: '用户名称',
        dataIndex: 'name',
      },
      {
        title: '账号',
        dataIndex: 'account',
      },
      {
        title: '状态',
        dataIndex: 'useFlag',
      },
      {
        title: '联系电话',
        dataIndex: 'mobile',
      },
      {
        title: '创建人',
        dataIndex: 'createName',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        width: 220,
      },
    ]),
    data: [
      {
        id: 1,
        name: '白小纯',
        account: 'baixiaochun',
        useFlag: '1',
        mobile: '13808805858',
        createName: 'admin',
        createTime: '2022-05-26 20:10:40',
      },
    ],
  });

  // 模板引用 https://v3.cn.vuejs.org/guide/composition-api-template-refs.html
  // 表单组件实例
  const userFormRef = ref();

  onMounted(() => {
    // tableState.data =
  });
</script>

<template>
  <PageContainer>
    <!-- <template #title>
      <div>自定义title</div>
    </template>
    <template #content>
      <div>自定义content</div>
    </template> -->

    <!-- 表格查询参数 -->
    <div class="bg-white rounded-sm px-6 pt-6 mb-4">
      <a-form ref="formRef">
        <a-row :gutter="24">
          <a-col :xs="24" :lg="8" :xxl="6">
            <a-form-item label="用户名称">
              <a-input v-model:value="queryParam.name" placeholder="请输入" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="8" :xxl="6">
            <a-form-item label="账号名称">
              <a-input v-model:value="queryParam.account" placeholder="请输入" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="8" :xxl="6">
            <a-form-item label="用户状态">
              <a-select v-model:value="queryParam.useFlag" allow-clear>
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">正常</a-select-option>
                <a-select-option value="0">暂停</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <!-- <template v-if="queryFormExpand">
            <a-col :xs="24" :lg="8" :xxl="6">
              <a-form-item label="角色编码">
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :lg="8" :xxl="6">
              <a-form-item label="角色编码">
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
          </template> -->

          <a-col :xs="24" :xxl="(!queryFormExpand && 6) || 24">
            <div class="flex mb-6 justify-end" :class="queryFormExpand ? '' : '2xl:justify-start'">
              <a-space>
                <a-button type="primary" :loading="tableState.loading"> 查询 </a-button>
                <a-button :loading="tableState.loading">重置</a-button>
                <a @click="queryFormExpand = !queryFormExpand" style="margin-left: 8px">
                  {{ queryFormExpand ? '收起' : '展开' }}
                  <template v-if="queryFormExpand">
                    <UpOutlined />
                  </template>
                  <template v-else>
                    <DownOutlined />
                  </template>
                </a>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 表格查询参数 end -->

    <a-card :bordered="false">
      <div class="flex justify-end mb-6">
        <a-space>
          <a-button type="primary" v-auth="'user:add'" @click="userFormRef.add(0)">
            <template #icon><PlusOutlined /></template>新增
          </a-button>
        </a-space>
      </div>

      <a-table
        :columns="tableState.columns"
        :data-source="tableState.data"
        row-key="id"
        :bordered="false"
        :scroll="{ x: 1200 }"
      >
        <template #bodyCell="{ column, record }">
          <!-- 状态 -->
          <template v-if="column.dataIndex === 'useFlag'">
            <a-badge v-if="record.useFlag === '1'" status="processing" text="正常" />
            <a-badge v-else status="error" text="暂停" />
          </template>
          <!-- 操作 -->
          <template v-else-if="column.dataIndex === 'action'">
            <a-space>
              <a-button size="small" v-auth="'user:edit'" @click="userFormRef.edit(record)">
                编辑
              </a-button>
              <!--  @click="handleDelete(record.id)" -->
              <a-button size="small" danger v-auth="'user:delete'"> 删除 </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <UserForm ref="userFormRef" />
  </PageContainer>
</template>

<style lang="less"></style>
