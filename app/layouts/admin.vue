<template>
  <div class="admin-layout">
    <nav class="admin-nav">
      <ul>
        <li><NuxtLink to="/admin/dashboard">Dashboard</NuxtLink></li>
        <li><NuxtLink to="/admin/users">Users</NuxtLink></li>
        <li><NuxtLink to="/admin/settings">Settings</NuxtLink></li>
        <li><NuxtLink to="/admin/logout">Logout</NuxtLink></li>
      </ul>
    </nav>
    <main class="admin-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-nav {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.admin-nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.admin-nav a {
  color: white;
  text-decoration: none;
}

.admin-content {
  flex: 1;
  padding: 2rem;
}
</style>
