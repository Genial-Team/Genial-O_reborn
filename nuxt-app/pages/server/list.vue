<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useFetch} from "#app";

interface UserData {
  accessToken: string;
}

const guilds = ref<any[]>([]);
const isLoading = ref(true);
const headers = useRequestHeaders(['cookie']) as HeadersInit;

// Récupération du token d'accès
const { data: userData } = await useFetch<UserData>('/api/token', { headers });


function canInviteBot(permissions: string): boolean {

  const CREATE_INSTANT_INVITE = 0x00000020;
  const ADMINISTRATOR = 0x00000008;

  const userPermissions = BigInt(permissions);


  return (userPermissions & BigInt(ADMINISTRATOR)) !== 0n ||
      (userPermissions & BigInt(CREATE_INSTANT_INVITE)) !== 0n;
}

onMounted(async () => {
  try {
    guilds.value = await $fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${userData?.value?.accessToken}`,
        },
      });
    isLoading.value = false;
  } catch (err) {
    console.error('Erreur inconnue :', err);
  }
});
</script>

<template>
  <div>
    <!-- Indicateur de chargement -->
    <div v-if="isLoading" class="loading"></div>

    <!-- Liste des guilds -->
    <ul v-else class="guild-container">
      <li v-for="guild in guilds.filter( (g) => canInviteBot(g.permissions) )" :key="guild.id" class="guild">
        <img :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`" alt="Icone du serveur" />
        {{ guild.name }}
        <button>
          Configurer
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
a {
  transition: none;
  font-size: 1rem;
}

.guild-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  list-style: none;
}

.guild {
  //background: rgb(225, 225, 225);
  background: $white-secondary;
  border: 1px solid $primary;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 15px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.guild img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto;
}

.guild button {
  margin: 0 auto;
}

/* Nom de la guild */
.guild:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 15px $primary;
}

.guild:hover img {
  transition: transform 0.2s ease;
  transform: scale(1.1);
}

.guild {
  font-size: 1.2rem;
  font-weight: bold;
  color: $gray;
}

/* Chargement */
div[v-if="isLoading"] {
  text-align: center;
  font-size: 1.5rem;
  color: $primary;
  margin-top: 20px;
}

/* Responsive */
@media (max-width: 600px) {
  .guild {
    font-size: 1rem;
    padding: 10px;
  }

  .guild img {
    width: 60px;
    height: 60px;
  }
}
</style>