/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from "react-intl";

export const scope = "boilerplate.components.Footer";

export default defineMessages({
  licenseMessage: {
    id: "Copyright 202",
    defaultMessage: "Copyright 2020",
  },
  authorMessage: {
    id: "Author",
    defaultMessage: `
      Powered by Metastring Foundation.
    `,
  },
});
