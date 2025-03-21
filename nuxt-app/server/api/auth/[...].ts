import DiscordProvider from 'next-auth/providers/discord';
// @ts-ignore
import {NuxtAuthHandler} from '#auth';

export default NuxtAuthHandler({

    secret: useRuntimeConfig().authSecret,
    providers: [
        // @ts-ignore
        DiscordProvider.default({
            clientId: useRuntimeConfig().authDiscordClientId,
            clientSecret: useRuntimeConfig().authDiscordClientSecret,
            authorization: {
                url: "https://discord.com/oauth2/authorize",
                params: {
                    scope: "identify email guilds",
                    prompt: "consent"
                }
            },
            token: "https://discord.com/api/oauth2/token",
            userinfo: "https://discord.com/api/users/@me",
        })
    ],
    callbacks: {
        // @ts-ignore
        async jwt({token, account, user}) {
            if (account) {
                console.log("Scopes:", account.scope);
                token.accessToken = account.access_token; // Ajoute le jeton d'accès au token JWT
                token.refreshToken = account.refresh_token; // (Facultatif) Ajoute le refresh token
                token.expiresAt = account.expires_at; // Définit l'expiration du token

                // Facultatif : Ajouter des données utilisateur si nécessaires
                token.user = user ? {id: user.id, name: user.name, email: user.email} : null;
            }
            return token;
        },
        // @ts-ignore
        async session({session, token}) {
            session.accessToken = token.accessToken; // Transmet le jeton d'accès à la session
            session.expires = token.expiresAt; // Spécifie la date d'expiration dans la session
            session.user = {...session.user, id: token.user?.id}; // Ajoute des métadonnées utilisateur
            return session;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 jours
        updateAge: 24 * 60 * 60,   // 24 heures
    },
    events: {
        async signIn(message: any) {
            console.log('[EVENT]: Sign-in successful:', message);
        },
        async signOut(message: any) {
            console.log('[EVENT]: Sign-out successful:', message);
        },
        async error(error: any) {
            console.error('[EVENT]: Error during authentication:', error);
        },
    }
});