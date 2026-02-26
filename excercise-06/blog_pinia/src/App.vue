<script setup>
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/blog">Blog</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  background-color: #2c3e50;
  padding: 1rem 2rem;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

nav a.router-link-active {
  background-color: #44a574;
}

main {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}
</style>
