<script setup lang="ts">
import { currentRouteComponent } from "./router";
</script>

<template>
  <Component
    v-if="currentRouteComponent !== null"
    :is="currentRouteComponent"
  />
</template>
