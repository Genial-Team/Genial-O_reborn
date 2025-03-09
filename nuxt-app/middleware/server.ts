import type {Guild} from "~/types/guild";

export default defineNuxtRouteMiddleware(async (to, from) => {


    const requestedRoute = to.path.replace(/\/$/, '')
    const invitationLink = "https://discord.com/oauth2/authorize?client_id=944941584691105843&permissions=8&scope=applications.commands+bot"

    const routeRegex = /^\/server\/\d+$/;

    // checking if bot is present on the request server and invite him if not
    if (routeRegex.test(requestedRoute)) {

        const serverId = requestedRoute.split('/')[2]
        const discordResponse: any = await useFetch(`/api/guild?id=${serverId}`)

        const serverName = discordResponse.data.value?.guild.name;

        if (!serverName) return navigateTo(invitationLink, {
            external: true
        })
    }
})
