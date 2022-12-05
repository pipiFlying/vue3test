<template>
  <div>
    <LoginVue />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const arr = ref<number[]>([]);

arr.value = [8, 6, 5];

const sort = (arr: number[]) => {
  if (!arr || arr.length < 0) return false;
  arr.forEach((item, i) => {
    if (i >= arr.length - 1) return false;
    if (arr[i] - arr[i + 1] > 0) {
      const num = arr.splice(0, 1, arr[1])[0];
      arr.splice(0, 1, arr[1]);
      arr[1] = num;
    } else if (arr[0] - arr[i + 2] > 0) {
      const num = arr.splice(0, 1, arr[2])[0];
      arr.splice(0, 1, arr[2]);
      arr[2] = num;
    } else if (arr[0] - arr[3] > 0) {
      const num = arr.splice(0, 1, arr[3])[0];
      arr.splice(0, 1, arr[3]);
      arr[3] = num;
    } else if (arr[0] - arr[length - 1] > 0) {
      const num = arr.splice(0, 1, arr[length - 1])[0];
      arr.splice(0, 1, arr[length - 1]);
      arr[length - 1] = num;
    }
  });
  console.log(arr, 'arr');
};

onMounted(() => {
  sort(arr.value);
});
</script>
<style lang="less" scoped></style>
