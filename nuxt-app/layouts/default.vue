<script setup lang="ts">
import ThemeSwitcher from "~/components/Theme-switcher.vue";

const { signIn, signOut } = useAuth()

const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: userData } = await useFetch('/api/token', { headers })

const user = {
  name: userData?.value?.name || 'Guest',
  profilePicture: userData?.value?.picture || '/default-profile.png'
};

</script>

<template>
  <div class="wrapper">
    <!-- Logged-in user-->
    <div v-if="userData" class="sidebar">
      <div class="user-info">
        <img :src="user.profilePicture" alt="User Profile" class="profile-picture"/>
        <p class="user-name">{{ user.name }}</p>
      </div>
      <nav>
        <ul class="menu">
          <li><NuxtLink to="http://localhost:8080/">Accueil</NuxtLink></li>
          <li><NuxtLink to="http://localhost:8080/server/list">Mes serveurs</NuxtLink></li>
          <li><NuxtLink to="http://localhost:8080/settings">Settings</NuxtLink></li>
          <li><NuxtLink to="/" @click="signOut">Logout</NuxtLink></li>
        </ul>
      </nav>
      <ThemeSwitcher/>

    </div>
    <!-- Logged-of user-->
    <div v-else class="sidebar">
      <div class="user-info">
        <svg class="profile-picture" width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
          <circle cx="50" cy="50" r="48" stroke="#ccc" stroke-width="0"/>
          <circle cx="50" cy="40" r="15" fill="#ccc"/>
          <path d="M25 80c0-15 10-25 25-25s25 10 25 25" fill="#ccc"/>
        </svg>
      </div>
      <nav>
        <ul class="menu">
          <li><NuxtLink to="http://localhost:8080/">Accueil</NuxtLink></li>
          <li><NuxtLink to="/" @click="signIn('discord')">Se connecter</NuxtLink></li>
          <li><NuxtLink to="http://localhost:8080/about">À propos</NuxtLink></li>
          <li><NuxtLink to="http://localhost:8080/help">Aide</NuxtLink></li>
        </ul>
      </nav>
      <ThemeSwitcher/>
    </div>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">

.wrapper {
  display: flex;
}

.sidebar {
  width: 250px;
  background-color: var(--background-secondary);
  padding: 20px 20px 5px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.user-info {
  text-align: center;
  margin-bottom: 20px;

  img {
    margin: 0 auto;
  }
}

.user-info .profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid var(--decoration);
}

.user-info .user-name {
  font-size: 1.2em;
  font-weight: bold;
  color: var(--text);
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 5px 0;
  }

  a {
     text-decoration: none;
     color: var(--text);
     font-size: 1em;
     display: block;
     padding: 10px;
     border-radius: 4px;
     transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: $primary;
      color: #fff;
    }
   }
}

nav {
  flex-grow: 1;
}

.content {
  width: 100%;
  padding: 20px;
  max-height: 100lvh;
  overflow: scroll;
}

</style>