import { generatePath } from "react-router";

function prependWindowOrigin(urlPath: string) {
  return `${window.origin}${urlPath}`;
}

/**
 * Utility methods to generate full absolute URLs, generally used for sharing
 * the links with others.
 */
export const getLink = {
  /**
   * Creates a URL for sharing with others to answer a Johari
   */
  toAnswerJohari(johariID: string) {
    return prependWindowOrigin(generatePath(`/answer/${johariID}`));
  },

  /**
   * Creates a URL to view a Johari
   */
  toViewJohari(johariID: string) {
    return prependWindowOrigin(generatePath(`/view/${johariID}`));
  },
};
