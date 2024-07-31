// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-21',
  devServer:{
    https: {
      key: "./localhost-key.pem",
      cert: "./localhost.pem"
    },
  },
  runtimeConfig: {
    app:{
      ablyAPIKey: process.env.ABLY_API_KEY,
    },
    public: {
      port: 3000
    }
  },
  devtools: { enabled: false },
  preset: 'node-server',
  srcDir: './src',
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt',
  'nuxt-booster',
  "@nuxtjs/google-fonts", "@tresjs/nuxt",  '@morev/vue-transitions/nuxt',
  [
    '@pinia/nuxt',
    {
      autoImports: ['defineStore', 'acceptHMRUpdate', 'useDayjs'],
      storesDirs: ['./src/stores/**'],
    },
],],

  booster: {
    detection: {
      performance: true,
      browserSupport: true
    },
    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 }
      },
      timing: {
        fcp: 800,
        dcl: 1200
      }
    },
    targetFormats: ['webp', 'avif', 'jpg|jpeg|png|gif'],
    componentAutoImport: false,
    componentPrefix: undefined,
    lazyOffset: {
      component: '0%',
      asset: '0%'
    },
    optimizePreloads: true,
    disableNuxtFontaine: true,
    disableNuxtImage: true,
  },

  googleFonts: {
    families: {
      Unbounded: '200..900',
      Inter: '300..800',
    },
    display: 'swap',
    preload: true,
    useStylesheet: true,
    base64: true,
    download: true,
  },
  tailwindcss: {
    cssPath: ['~/assets/styles/main.scss', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2,
    },
    config: {},
    // viewer: true,
  },
  css: [
    '~/assets/styles/main.scss',
  ],
  app: {
    head:{
      meta:[
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        {"http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests"}
      ]
    },
    port: '3000',
    exec_mode: 'cluster',
    instances: 'max',
    script: './.output/server/index.mjs',
  },
  plugins: [
    {
      src: '~/plugins/ably.ts',
      ssr: false,
      mode: 'client',
    },
    {
      src: '~/plugins/qrcode.ts',
      ssr: false,
      mode: 'client',
    },
    // {
    //   src: '~/plugins/lenis.ts',
    //   ssr: false,
    //   mode: 'client',
    // },
  ],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  ssr: true,
  generate: { fallback: '404.html' },
  build: {
    extend (config, ctx) {
      config.resolve.symlinks = false;
    },
  },
})