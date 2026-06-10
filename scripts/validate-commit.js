/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");

const commitMsgFile = process.argv[2];

const message = fs
  .readFileSync(commitMsgFile, "utf8")
  .trim();

const regex = /^#[1-9]\d*\s.+\s-\s\d{4}-\d{2}-\d{2}$/;

if (!regex.test(message)) {
  console.error(`❌ Invalid commit format.

Expected:
#12 Create navbar - 2026-06-10

Examples:
#1 Update README - 2026-06-10
#12 Create navbar - 2026-06-10
#31 Fix mobile menu - 2026-06-10
`);

  process.exit(1);
}

console.log("✅ Commit message format is valid.\n");