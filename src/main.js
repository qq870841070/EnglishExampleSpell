import { createApp } from 'vue'
import ElementPlus from 'element-plus' // 引入element-plus
import 'element-plus/theme-chalk/index.css' // 引入element-plus的样式
import zhCn from 'element-plus/dist/locale/zh-cn'

import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, { zIndex: 3000, size: 'middle' ,locale:zhCn})

app.mount('#app')
