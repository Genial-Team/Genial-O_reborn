// https://nuxt.com/docs/api/configuration/nuxt-config
import DiscordProvider from "next-auth/providers/discord";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},
    runtimeConfig: {
        authDiscordClientSecret: process.env.AUTH_DISCORD_CLIENT_SECRET,
        authDiscordClientId: process.env.AUTH_DISCORD_CLIENT_ID,
        discordBotToken: process.env.DISCORD_BOT_TOKEN
    },
  vite: {
      css: {
          preprocessorOptions: {
              scss: {
                  additionalData: '@use "~/assets/scss/variable.scss" as *;'
              }
          }
      }
  },
  modules: ['@sidebase/nuxt-auth', '@nuxtjs/color-mode'],
    auth: {
        isEnabled: true,
        disableServerSideAuth: false,
        originEnvKey: 'AUTH_ORIGIN',
        baseURL: 'http://localhost:8080/api/auth',
        provider: {
            type: "authjs",
            trustHost: true,
            defaultProvider: "discord",
            addDefaultCallbackUrl: true
        },
        sessionRefresh: {
            enablePeriodically: true,
            enableOnWindowFocus: true,
        }
    },
    colorMode: {
        preference: 'system', // default value of $colorMode.preference
        fallback: 'light', // fallback value if not system preference found
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '-mode',
        storage: 'localStorage', // or 'sessionStorage' or 'cookie'
        storageKey: 'nuxt-color-mode'
    }
})