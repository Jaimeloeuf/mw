<script setup lang="ts">
import { sf } from "simpler-fetch";
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

  const [err, res] = await sf
    .useOnce(`./entrypoint${props.route}`)
    .GET()
    .runText<string>();

  if (err !== null) {
    console.error("Failed to load entrypoint component");
    return;
  }

  // Dynamically evaluate loaded JS component
  return eval(res.data);
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
