import { ref, Component } from "vue";

export const currentRouteComponent = ref<null | Component>(null);

export function setRouterView(component: any) {
  console.log("setRouterView called with:", component);
  currentRouteComponent.value = component;
}
