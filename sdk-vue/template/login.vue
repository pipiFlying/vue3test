<template>
  <div id="sdk-login">
    <div class="sdk-title">{{ sdk }}</div>
    <div class="sdk-computed">{{ num }}</div>
    <button @click="plus">加</button>
    <button @click="subtraction">减</button>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, computed, createSSRApp, onMounted } from 'vue';
import { renderToString } from 'vue/server-renderer';

const sdk: Ref<string> = ref('sdk init ...');
const count: Ref<number> = ref(0);
const num = computed(() => count.value + 1);

const plus = () => {
  count.value++;
};

const subtraction = () => {
  count.value--;
};

const app = createSSRApp({
  data: () => ({ msg: 'hello' }),
  template: `<div>{{msg}}</div>`
});

onMounted(async () => {
  const html = await renderToString(app);
  console.log(html);
});

// defineProps({});
</script>

<!-- 关键之关键 -->
<script lang="ts">
export default {
  // name也需要完全同名;
  name: 'LoginVue'
};
</script>

<style lang="scss" scoped></style>
