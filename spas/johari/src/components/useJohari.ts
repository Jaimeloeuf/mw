import { useQuery } from "@tanstack/react-query";
import type { johariGetJohariController_OutputFullDTO } from "@generated-api-types";

export function useJohari(johariID: string) {
  return useQuery<johariGetJohariController_OutputFullDTO>({
    queryKey: ["johari", johariID],
    async queryFn() {
      return fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/johari/${johariID}`,
      ).then((res) => res.json());
    },
  });
}
