module.exports = `
<template>
  <div class="calculator">
    <div class="screen">
      <div class="in">{{ ins }}</div>
      <div class="out">{{ out }}</div>
    </div>
    <div class="button">
      <div class="button-item" v-for="(e, i) in all" :key="i" @click="action(e as string, i)">{{ e }}</div>
    </div>
</div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

const all: Ref<string[] | number[]> = ref([]);
const ins: Ref<string> = ref('');
const out: Ref<number> = ref(0);
const type: Ref<string> = ref('');

const result = (v: string) => {
  const rs = ins.value.split(v);
  const num1 = Number(rs[0]);
  const num2 = Number(rs[1]);
  switch (v) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'x':
      return num1 * num2;
    case '÷':
      return num1 / num2;
  }
};

const action = (e: string, i: number) => {
  if (i === 2) ins.value = '';
  if (i === 1) out.value = 0;
  if (typeof e !== 'number' && i !== 19) type.value = e;
  if (i !== 19) ins.value += e;
  if (i === 19) out.value = result(type.value) as any;
};

all.value = ['%', 'CE', 'C', '÷', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', '+/-', 0, '.', '='] as any;
</script>

<style lang="less" scoped>
.calculator {
  width: 500px;
  .screen {
    height: 200px;
    background: #282c34;
  }
  .button {
    display: flex;
    flex-flow: row wrap;
    .button-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      flex: 0 0 calc(25% - 4px);
      border: 2px solid #494949;
      background: #282c34;
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
`;
