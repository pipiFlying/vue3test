<template>
  <div class="source">
    <el-button type="primary" @click="getSourceFn">获取静态服务端数据</el-button>
    <el-button type="primary" @click="getLocalFn">获取静态本地源数据</el-button>
    <el-button type="primary" @click="getMockFn">获取MOCK本地源数据</el-button>
    <el-button type="primary" @click="getMysqlFn">获取本地mysql源数据</el-button>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, getCurrentInstance } from 'vue';
import { getSource, getLocal, getMock, getMysql } from '@/api';

const CODE_OK: number = getCurrentInstance()?.appContext.config.globalProperties.CODE_OK;

const sourceData = ref<any[]>([]);

const getSourceFn = async () => {
  try {
    const { data, status } = await getSource();
    if (status !== CODE_OK) return;
    console.log(data, 'data');
    sourceData.value = data;
  } catch (e) {}
};

const getLocalFn = async () => {
  try {
    const {
      data: { data, code }
    } = await getLocal();
    if (code !== CODE_OK) return;
    console.log(data, 'data');
  } catch (e) {}
};

const getMockFn = async () => {
  try {
    const {
      data: { data, code }
    } = await getMock();
    if (code !== CODE_OK) return;
    console.log(data, 'data');
  } catch (e) {}
};

const getMysqlFn = async () => {
  try {
    const {
      data: { data, code }
    } = await getMysql(10);
    if (code !== CODE_OK) return;
    console.log(data, 'data');
  } catch (e) {}
};
onMounted(() => {});
</script>

<style lang="less" scoped>
.source {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ::v-deep .el-button {
    width: 200px;
    margin-top: 20px;
    margin-left: 0;
  }
}
</style>
