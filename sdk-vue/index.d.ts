import { Component } from 'vue';
declare interface Window {
  Vue: any;
}

interface Com {
  [name: string]: Component;
}

declare function withInstall(main: Com);
