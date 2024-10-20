<script setup lang="ts">
import { ref, Component } from "vue";
import { setRouterView } from "./router";

const props = defineProps<{
  route: string;
  preloadImmediately?: true;
  preloadOnHover?: true;
}>();

const preloadedComponent = ref<null | Component | Promise<Component>>(
  props.preloadImmediately ? loadComponent() : null
);

async function loadComponent() {
  // If the component is already preloaded
  if (!props.preloadImmediately && preloadedComponent.value !== null) {
    return;
  }

  // @todo Make API call to dynamically load the component here
  // @todo Use entrypoint definition js object to determine the component to load
  switch (props.route) {
    case "/home":
      return (await import("./pages/home.vue")).default;
    case "/about":
      return (await import("./pages/about.vue")).default;
    case "/instant":
      return (await import("./pages/instant.vue")).default;
    default:
      throw new Error("404");
  }
  // const dynamicallyLoadedComponent = await import(componentPath);
  // return dynamicallyLoadedComponent.default;
}

function onHover() {
  if (props.preloadOnHover) {
    preloadedComponent.value = loadComponent();
  }
}

async function onClick(e: Event) {
  // Prevent browser refresh to do client side routing by replacing components
  // dynamically instead.
  e.preventDefault();

  // Show some global transition UI

  const dynamicallyLoadedComponent = await (preloadedComponent.value ??
    loadComponent());

  setRouterView(dynamicallyLoadedComponent);

  // Push state to history for URL to change too
  window.history.pushState({}, "", props.route);
}
</script>

<template>
  <a :href="props.route" @click="onClick" @mouseover="onHover"><slot></slot></a>
</template>
