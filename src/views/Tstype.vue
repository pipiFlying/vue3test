<template>
  <div></div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

interface User {
  id: string;
  name: string;
}

interface Info extends User {
  age: number;
  height: number;
}

type Prop = {
  sex: string;
  weight: number;
};

type Text = Prop & {
  account: number;
};

const user: Ref<User> = ref({ id: '', name: '' });
const info: Ref<Info> = ref({ id: '', name: '', age: 20, height: 180 });
const prop: Ref<Prop> = ref({ sex: '', weight: 70 });
const text: Ref<Text> = ref({ sex: '', weight: 70, account: 2012 });

console.log(user, 'user');
</script>

<style scoped></style>
