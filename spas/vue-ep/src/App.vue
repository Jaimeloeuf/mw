<script setup lang="ts">
import routerlink from "./router-link.vue";
import routerview from "./router-view.vue";
</script>

<template>
  <div>
    <routerlink route="/home" preload>Home</routerlink>
    <br />
    <routerlink route="/about" preload>About</routerlink>
  </div>

  <routerview />
</template>
