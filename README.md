# template-vue

## 项目初始化

```shell
npm init vite@latest template-vue -- --template vue-ts
cd template-vue
npm install
npm run dev
```

## 相关配置

### 配置环境变量

### Vite配置

- 安装依赖

```shell
npm install @types/node --save-dev
```

- 配置Vite

```ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@layout': path.resolve(__dirname, 'src/layout'),
            '@components': path.resolve(__dirname, 'src/components')
        }
    },
    server: {
        host: '127.0.0.1',
        port: 3000,
        cors: true,
        open: false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    }
})
```

*解决打包错误 `package.json`*

```json5
{
  "script": {
    "build": "vue-tsc --noEmit --skipLibCheck && vite build"
  }
}
```

### 配置Typescript

```json5
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": [
      "ESNext",
      "DOM"
    ],
    "skipLibCheck": true,
    "types": [
      "node",
      "vite/client"
    ]
  },
  "skipLibCheck": true,
  "noImplicitAny": true,
  "noImplicitThis": true,
  "strictNullChecks": true,
  "suppressImplicitAnyIndexErrors": true,
  "baseUrl": ".",
  "paths": {
    "@": [
      "src"
    ]
  },
  "exclude": [
    "node_modules"
  ],
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
```

### 配置sass

- 安装依赖

```shell
npm install sass sass-loader -D
```

### 配置vue-router

- 安装依赖

```shell
npm install vue-router@4
```

- 配置router

```ts
// src/router/index.ts
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = []

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach(() => {
})

export default router
```

- 全局注册

```ts
// main.ts
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).mount('#app')
```

### 配置nProgress

- 安装

```shell
npm install nprogress --save
```

- 配置

```ts
import * as nProgress from 'nprogress'

nProgress.configure({
    ease: 'linear',
    speed: 500,
    showSpinner: false  // 是否使用进度环
})

export default nProgress


// 在mian.ts中引入样式和nProgress
import 'nprogress/nprogress.css'

// 使用
import nProgress from './plugins/nProgress'

nProgress.start()
nProgress.done()
```

- 配置进度条颜色

```css
/*设置进度条颜色  不配置时为默认颜色*/
#nprogress .bar {
    background: red !important;
}
```

*解决引用错误问题*

```ts
// 在vite-env.d.ts中添加
declare module 'nprogress'
```

### 配置全局样式

- 公共样式表

```scss
/*全局公共样式表*/
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  a {
    text-decoration: none;
    color: #333;
  }

  ul, li {
    list-style: none;
  }

}

/*设置滚动条样式*/
::-webkit-scrollbar {
  width: 5px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(26, 25, 25, 0.3);
  background-color: rgba(0, 0, 0, 0.1);
}

/*设置进度条颜色  不配置时为默认颜色*/
#nprogress .bar {
  /*background: rgba(41, 236, 127, 0.5) !important;*/
}
```

- reset.css

```shell
npm install reset.css --save
```

- animate.css

```shell
npm install animate.css --save
```

- 使用

```ts
// main.ts
import {createApp} from 'vue'
import App from './App.vue'
import './assets/stytle/global.scss'
import 'reset.css'
import 'animate.css'

const app = createApp(App)

app.mount('#app')
```

### 配置windicss

- 安装

```shell
npm install -D vite-plugin-windicss windicss
```

- 配置

```ts
//  在vite.config.ts中添加下列配置
import WindiCSS from 'vite-plugin-windicss'

export default {
    plugins: [
        WindiCSS(),
    ],
}

// 在main.ts中引入样式文件
import 'virtual:windi.css'
```

### 配置element plus

- 安装

```shell
# element plus
npm install element-plus --save
# element plus icon
npm install @element-plus/icons-vue
```

- 配置

```ts
// src/plugins/element-plus.ts
import {App} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as Icons from '@element-plus/icons-vue'

export default {
    install(app: App) {
        app.use(ElementPlus, {
            locale,
            size: 'default' || 'small' || 'large'
        })
        Object.keys(Icons).forEach((key: string) => {
            app.component(key, Icons[key as keyof typeof Icons]);
        })
    }
}
```

- 全局注册

```ts
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from './plugins/element-plus'

const app = createApp(App)

app.use(ElementPlus)
    .mount('#app')
```

### 配置axios

- 安装依赖

```shell
# axios
npm install axios --save
# qs
npm install qs
```

*解决qs报错*

```ts
//  vite-env.d.ts
declare module 'qs'
```

### 配置pinia

- 安装依赖

```shell
npm install pinia
```

- 基本配置

```ts
//  store/index.ts
import {defineStore} from 'pinia'

interface mainType {
}

export const useMainStore = defineStore('main', {
    // 存储全局状态
    state: (): mainType => {
        return {}
    },

    // 封装计算属性 具有缓存功能
    getters: {},

    // 封装业务逻辑 修改state
    actions: {}
})
```

- 全局注册

```ts
// main.ts
import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'

const app = createApp(App)

app.use(createPinia())
    .mount('#app')
```