export default defineEventHandler(async (event) => {
    const token = useRuntimeConfig().discordBotToken;
    const { id } = getQuery(event);

    // Vérification de l'ID
    if (!id || typeof id !== 'string') {
        throw new Error('Paramètre ID invalide ou manquant');
    }

    // Vérification du token Discord
    if (!token) {
        throw new Error('Token Discord manquant');
    }
    const finalObject = {
        guild: undefined,
        channels: undefined,
        members: undefined,
    };

    try {
        const guild = await fetch(`https://discord.com/api/v10/guilds/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const channels = await fetch(`https://discord.com/api/v10/guilds/${id}/channels`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${token}`,
            }
        })

        const members = await fetch(`https://discord.com/api/v10/guilds/${id}/members`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${token}`,
            }
        })

        finalObject.guild = await guild.json();
        finalObject.channels = await channels.json();
        finalObject.members = await members.json();

        return finalObject;

    } catch (err: any) {
        console.error('Erreur lors de la requête vers Discord', err.message);
        throw err;
    }
});