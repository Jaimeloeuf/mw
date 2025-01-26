import { useQuery } from "@tanstack/react-query";
import type { johariGetJohariAnswersController_OutputFullDTO } from "@generated-api-types";

/**
 * Hook to load all answers for a given Johari ID
 */
export function useJohariAnswers(johariID: string) {
  return useQuery<johariGetJohariAnswersController_OutputFullDTO>({
    queryKey: ["johari", "answers", johariID],
    async queryFn() {
      return fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/johari/answers/${johariID}`
      ).then((res) => res.json());
    },
  });
}
