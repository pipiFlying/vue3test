import LoginVue from './template/login.vue';
import { withInstall } from './utils';

const components = [LoginVue];

type cop = typeof LoginVue;

// 按需导入;
export { LoginVue };
// 全量导入;
export default withInstall([...components]);
