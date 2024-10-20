<script setup lang="ts">
import routerlink from "./router-link.vue";
import routerview from "./router-view.vue";
</script>

<template>
  <div>
    <routerlink route="/home" preloadOnHover>Home</routerlink>
    <br />
    <routerlink route="/about" preloadOnHover>About</routerlink>
    <br />
    <routerlink route="/instant" preloadImmediately>Instant</routerlink>
  </div>

  <routerview />
</template>
