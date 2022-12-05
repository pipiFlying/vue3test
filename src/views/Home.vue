<template>
  <div class="home">
    <RouterLink to="/flex">Flex |</RouterLink>
    <RouterLink to="/deal">Deal |</RouterLink>
    <RouterLink to="/sort">Sort |</RouterLink>
    <RouterLink to="/tstype">Tstype |</RouterLink>
    <RouterLink to="/source">Source |</RouterLink>
    <RouterLink to="/">Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Data {
  msg: string;
  newMsg: string;
}

// 实现响应式数据
const data: Data = {
  msg: '',
  newMsg: ''
};

const handle = {
  get: (target: any, key: any) => {
    return target[key];
  },
  set: (target: any, key: any, value: any) => {
    target[key] = value;
    effect(value);
    return true; // 在ts严格环境下这里必须return true 否者无法使用proxy赋值
  }
};

const effect = (value: any) => {
  console.log(`触发函数${value}设置`);
};

const proxy = new Proxy(data, handle);
proxy.msg = '';
</script>
