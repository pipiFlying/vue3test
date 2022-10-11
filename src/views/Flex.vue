<template>
  <div class="box">
    <div class="box-item" v-for="(e, i) in all" :key="i"></div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

const all: Ref<any[]> = ref([]);
all.value = new Array(15).fill(0);
</script>

<style lang="less" scoped>
@space: 8px;
.box {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  .box-item {
    /*
    4列布局想要满足最右侧无缝隙, 且子元素均匀分布, margin-right的值和单个子元素减去缝隙的值满足4:3即可
    flex: 0 0 calc(25% - 2px - x);
    margin-right: y;
    y:x = 4:3
    计算公式：
    设单个子元素的宽度为:25% - x;
    margin-right为:y;
    (25% - x)*4 + 3y = 100%;
    求得比值为y:x = 4:3
    */
    flex: 0 0 calc(25% - 2px - 3 * @space);
    height: 30px;
    border: 1px solid #7a7a7a;
    background: red;
    margin-right: 4 * @space;
  }
  :nth-child(4n) {
    margin-right: 0px !important;
  }
}
</style>
