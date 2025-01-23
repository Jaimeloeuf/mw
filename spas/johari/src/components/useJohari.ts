import { useQuery } from "@tanstack/react-query";

export function useJohari(johariID: string) {
  return useQuery({
    queryKey: ["johari", johariID],
    async queryFn() {
      return fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/johari/${johariID}`
      ).then((res) => res.json());
    },
  });
}
