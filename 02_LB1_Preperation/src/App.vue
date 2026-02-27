<script setup>
</script>

<template>
  <div id="app">
    <header>
      <h1>Mein Rezeptbuch</h1>
      <nav>
        <RouterLink to="/">Übersicht</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>Rezeptbuch App – LB1 Vorbereitungsauftrag</p>
    </footer>
  </div>
</template>
