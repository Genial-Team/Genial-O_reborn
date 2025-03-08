import { createError, readBody } from 'h3';
export default eventHandler(async (event) => {
    if (event.method?.toUpperCase() !== 'POST') {
        throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
    }

    const { refresh_token: refreshToken } = await readBody(event);
    if (!refreshToken || typeof refreshToken !== 'string' || !refreshToken.trim()) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid or missing refresh token' });
    }

    const runtimeConfig = useRuntimeConfig();
    const clientId = runtimeConfig.authDiscordClientId;
    const clientSecret = runtimeConfig.authDiscordClientSecret;


    if (!clientId || !clientSecret || typeof clientId !== 'string' || typeof clientSecret !== 'string') {
        throw createError({
            statusCode: 500,
            statusMessage: 'Invalid Discord API credentials',
        });
    }

    try {
        console.log('trying to refresh token')
        const discordResponse: any = await $fetch('https://discord.com/api/v10/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                scope: 'identify email guilds',
            }),
        }).catch(fetchError => {
            throw createError({
                statusCode: 502,
                statusMessage: `Failed to contact Discord: ${fetchError.message}`,
            });
        });

        console.log(discordResponse)

        if (!discordResponse || !discordResponse.access_token) {
            throw createError({
                statusCode: 400,
                statusMessage:
                    discordResponse.error_description ?? 'Failed to refresh token',
            });
        }

        return {
            accessToken: discordResponse.access_token,
            refreshToken: discordResponse.refresh_token,
            expiresIn: discordResponse.expires_in,
        };
    } catch (error) {
        console.error('Discord Refresh Token Error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to refresh token',
        });
    }
});