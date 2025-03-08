<script setup lang="ts">
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
          <li><NuxtLink to="http://localhost:8080/servers">Mes serveurs</NuxtLink></li>
          <li><NuxtLink to="http://localhost:8080/settings">Settings</NuxtLink></li>
          <li><NuxtLink to="http://localhost:8080/api/auth/signout">Logout</NuxtLink></li>
        </ul>
      </nav>
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
          <li><NuxtLink to="http://localhost:8080/api/auth/signin">Se connecter</NuxtLink></li>
          <li><NuxtLink to="http://localhost:8080/about">À propos</NuxtLink></li>
          <li><NuxtLink to="http://localhost:8080/help">Aide</NuxtLink></li>
        </ul>
      </nav>
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
  background-color: #f5f5f5;
  padding: 20px;
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
  border: 2px solid #ddd;
}

.user-info .user-name {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
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
     color: #555;
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
  padding: 20px;
}

</style>