import DiscordProvider from 'next-auth/providers/discord';
// @ts-ignore
import { NuxtAuthHandler } from '#auth';

export default NuxtAuthHandler({

    secret: useRuntimeConfig().authSecret,
    providers: [
        // @ts-expect-error
        DiscordProvider.default({
            clientId: useRuntimeConfig().authDiscordClientId,
            clientSecret: useRuntimeConfig().authDiscordClientSecret,
            tokenUrl: 'https://discord.com/api/oauth2/token',
            authorizationUrl: 'https://discord.com/oauth2/authorize?client_id=944941584691105843&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fauth%2Fcallback%2Fdiscord&scope=identify+email+guilds',
            userinfoUrl: 'https://discord.com/api/users/@me',
            profileUrl: 'https://discord.com/api/users/@me',
            scope: 'identify email guilds',
        })
    ],
    callbacks: {
        // @ts-ignore
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token; // Ajoute le jeton d'accès au token JWT
                token.refreshToken = account.refresh_token; // (Facultatif) Ajoute le refresh token
                token.expiresAt = account.expires_at; // Définit l'expiration du token

                // Facultatif : Ajouter des données utilisateur si nécessaires
                token.user = user ? { id: user.id, name: user.name, email: user.email } : null;
            }
            return token;
        },
        // @ts-ignore
        async session({ session, token }) {
            session.accessToken = token.accessToken; // Transmet le jeton d'accès à la session
            session.expires = token.expiresAt; // Spécifie la date d'expiration dans la session
            session.user = { ...session.user, id: token.user?.id }; // Ajoute des métadonnées utilisateur
            return session;
        },
    },
    // pages: {
    //     signIn: '/auth/signin', // Page de connexion personnalisée
    //     signOut: '/auth/signout', // Page de déconnexion personnalisée
    //     error: '/auth/error', // Page d'erreur en cas de problème
    //     callback: '/auth/callback', // Page de rappel après autorisation
    // },
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