import { ref, Component } from "vue";

export const currentRouteComponent = ref<null | Component>(null);

export function setRouterView(component: any) {
  console.log("setRouterView called with:", component);

  // Only set the component if it is not the same
  if (currentRouteComponent.value !== component) {
    currentRouteComponent.value = component;
  }
}
