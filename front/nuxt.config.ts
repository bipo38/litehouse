// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/styles/main.scss"],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Inter: {
        wght: [300, 400, 500, 700],
      },
    },
  },
});
