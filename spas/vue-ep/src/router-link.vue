<script setup lang="ts">
import { setRouterView } from "./router";

const props = defineProps<{ route: string }>();

async function onClick(e: Event) {
  // Prevent browser refresh to do client side routing by replacing components
  // dynamically instead.
  e.preventDefault();

  // Show some global transition UI

  // @todo Make API call to dynamically load the component here
  // @todo Use entrypoint definition js object to determine the component to load
  const dynamicallyLoadedComponent =
    props.route === "/home"
      ? await import("./pages/home.vue")
      : await import("./pages/about.vue");

  setRouterView(dynamicallyLoadedComponent.default);

  // Push state to history for URL to change too
  window.history.pushState({}, "", props.route);
}
</script>

<template>
  <a :href="props.route" @click="onClick" @mouseover="onHover"><slot></slot></a>
</template>
