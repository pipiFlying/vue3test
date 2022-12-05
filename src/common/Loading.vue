<template>
  <div class="loading" v-loading.fullscreen.lock="loading"></div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
const { getters } = useStore();

// eslint-disable-next-line dot-notation
const loading = computed(() => getters['loading']);

watch([loading], (newVal, oldVal) => {});
</script>

<style lang="less" scoped></style>
