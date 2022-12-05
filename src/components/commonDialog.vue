<template>
  <el-dialog v-model="visible" @close="handleClose" title="Tips" width="30%" :before-close="handleClose">
    <span :style="{ color }">{{ content }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="setVal">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, inject } from 'vue';

const props = defineProps({
  content: String
});
const emit = defineEmits(['change']);
/* 采用解构赋值, 且保持响应式方式 */
const { content } = toRefs(props);
const visible = ref<boolean>(false);
const color = inject('color') as string;
const update = inject('update') as any;

const handleClose = () => {
  visible.value = false;
};

const open = () => {
  visible.value = true;
};
const setVal = () => {
  emit('change', 'vue3 子组件改变调用父子间方法');
  update('blue');
};
/* 向父组件暴露出子组件的数据及方法 */
defineExpose({
  open,
  visible
});
</script>

<style scoped></style>
