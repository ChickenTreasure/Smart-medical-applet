import { createSSRApp } from "vue";
import {createPinia} from 'pinia'
import App from "./App.vue";
// 创建实例
const pinia = createPinia()
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return {
    app,
  };
}
