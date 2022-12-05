import { App } from 'vue';
import { print } from '@/utils';

export default {
  install(app: App) {
    print('Node', '加载成功');
  }
};
