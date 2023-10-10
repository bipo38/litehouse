import * as constants from "lighthouse/core/config/constants.js";

const configs = [
  {
    extends: "lighthouse:default",
    settings: {
      onlyCategories: ["accessibility", "seo", "best-practices", "performance"],
      maxWaitForFcp: 15 * 1000,
      maxWaitForLoad: 35 * 1000,
      formFactor: "desktop",
      throttling: constants.throttling.desktopDense4G,
      screenEmulation: constants.screenEmulationMetrics.desktop,
      emulatedUserAgent: constants.userAgents.desktop,
      skipAudits: [
        "uses-http2",
        "bf-cache",
      ],
    },
  },
  {
    extends: "lighthouse:default",
    settings: {
      onlyCategories: ["accessibility", "seo", "best-practices", "performance"],
      formFactor: "mobile",
      output: ["json"],
    },
  },
];

export default configs;
