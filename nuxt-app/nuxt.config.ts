// https://nuxt.com/docs/api/configuration/nuxt-config
import DiscordProvider from "next-auth/providers/discord";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    runtimeConfig: {
        authDiscordClientSecret: process.env.AUTH_DISCORD_CLIENT_SECRET,
        authDiscordClientId: process.env.AUTH_DISCORD_CLIENT_ID,
        discordBotToken: process.env.DISCORD_BOT_TOKEN,
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
    app: {
        head: {
            title: 'Nuxt',
            htmlAttrs: {
                lang: 'fr',
            },
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            ]
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
        preference: 'system',
        fallback: 'light',
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '-mode',
        storage: 'sessionStorage',
        storageKey: 'nuxt-color-mode'
    }
})