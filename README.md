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