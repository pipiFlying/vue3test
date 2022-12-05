<template>
  <div ref="sss" class="ref-use">
    <el-button @click="open">开启弹窗</el-button>
    <ComDialog ref="comDialog" :content="content" @change="change" />
  </div>
</template>

<script setup lang="ts">
/* vue3的ref使用方法 */
import { ref, provide, onMounted, nextTick } from 'vue';
import ComDialog from '@/components/commonDialog.vue';

/* 此处需要用到InstanceType类型推断否则ts检测不到子组件抛出的数据及方法 */
const comDialog = ref<InstanceType<typeof ComDialog> | null>(null);
const content = ref<string>('vue3 父子传值及接收方式');
const color = ref<string>('red');

provide('color', color);

const update = (val: string) => {
  color.value = val;
};
/* 子孙组件更新顶层组件数据的方法 */
provide('update', update);

const open = async () => {
  comDialog.value?.open();
};

const change = (val: string) => {
  content.value = val;
};

onMounted(() => {});
</script>

<style lang="less" scoped></style>
