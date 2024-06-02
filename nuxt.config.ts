// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-svgo','nuxt-lodash'],
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"],
    alias: [
      ["camelCase", "stringToCamelCase"], // => stringToCamelCase
      ["kebabCase", "stringToKebab"], // => stringToKebab
      ["isDate", "isLodashDate"], // => _isLodashDate
    ],
  },
  css:[
    "~/assets/css/var.css",
    "~/assets/css/style.css"
  ],
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer'
          ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
          : []
    }
  },
  app: {
    rootId: 'nuxt-root',
    head: {
      meta: [
        { name: 'description', content: '中国传统颜色的展示, 提供CMYK值,RGB值,16进制' },
        { name: 'keywords', content: '中国色,中国传统色, 颜色' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { charset: 'UTF-8' },
        { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
      ],
      noscript: [
        { children: '您需要开启Javascript功能' },
      ],
    },
  },
})
