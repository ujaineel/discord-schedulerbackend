// .lintstagedrc.js
module.exports = {
  // If any ts/js(x) files changed.
  "**/*.{ts,js}?x": [
    // Execute tests related to the staged files.
    "npm run test -- --passWithNoTests --bail --findRelatedTests",

    // Run the eslint.
    // Anonymous function means: "Do not pass args to the command."
    () => "npm run lint",
  ],
};
