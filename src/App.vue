<template>
  <div>
    <router-view />
    <Loading />
  </div>
</template>

<script setup lang="ts">
import Loading from '@/common/Loading.vue';
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
}
</style>
