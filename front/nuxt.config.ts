// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/styles/main.scss"],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Inter: {
        wght: [400, 500, 700, 900],
      },
    },
  },
  runtimeConfig: {
    apiUrl: process.env.API_URL || "http://localhost:8000",

    public: {
      apiUrl: process.env.API_URL || "http://localhost:8000",
    },
  },
  imports: {
    dirs: ["composables"],
  },
});
