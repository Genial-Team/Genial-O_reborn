<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useFetch } from "#app";
import type {Guild} from "~/types/guild";

definePageMeta({
  middleware: [
    'server',
  ],
});

const route = useRoute();
const headers = useRequestHeaders(["cookie"]) as HeadersInit;

const { data: userData } = await useFetch("/api/token", { headers });

const isLoading = ref(true);
const serverData = ref<Guild | null >(null);

const userIsOwner = computed(() => {
  // @ts-ignore
  return serverData.value?.owner_id === userData.user?.id ? "Vous" : "inconnus";
});

const getServerIconUrl = (serverData: any) => {
  return serverData?.guild.icon
      ? `https://cdn.discordapp.com/icons/${serverData.guild.id}/${serverData.guild.icon}.png`
      : "https://cdn.discordapp.com/embed/avatars/0.png";
};

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/guild?id=${route.params.id}`);

    serverData.value = await response.json();
  } catch (err) {
    console.error("Erreur lors de la récupération des données du serveur :", err);
  } finally {
    isLoading.value = false;
  }
});

</script>

<template>
  <!-- Indicateur de chargement -->
  <div v-if="isLoading" class="loading"></div>

  <!-- Page principale du serveur -->
  <div v-if="!isLoading && serverData" class="server-page">
    <header class="server-header">
      <img
          :src="getServerIconUrl(serverData)"
          alt="Icône du serveur"
          class="server-icon"
      />
      <div>
        <h1>{{ serverData.guild.name }}</h1>
        <p v-if="serverData.guild.description">{{ serverData.guild.description }}</p>
        <p v-else>Aucune description disponible pour ce serveur</p>
      </div>
    </header>

    <!-- Description du serveur -->
    <section class="server-subheader">

      <p>
        <strong>Localisation :</strong> {{ serverData.guild.region || "Inconnue" }}
      </p>
      <p>
        <strong>Propriétaire :</strong> {{ userIsOwner }}
      </p>
    </section>

    <main style="text-align: center; padding-top: 15%">
      Cette section est en construction, plus d'options seront ajoutées très bientôt.
      vous pourrez gérer la configuration du serveur ici.</main>
  </div>
</template>

<style scoped>
.server-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--decoration);
}
.server-subheader {
  display: flex;
  flex-direction: row;

  p {
    margin: 5px;
    padding: 0 10px;
    font-style: italic;

    strong {
      font-style: normal;
    }
  }
}

</style>