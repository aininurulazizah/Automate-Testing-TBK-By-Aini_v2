export function buildCommand(clients, scenarios, browser) {

    const grepParts = [];

    for (const client of clients) {

        for (const scenario of scenarios) {

            // Skip unsupported scenarios
            if (!scenario.supports(client)) {
                continue;
            }

            grepParts.push(`${client.tag}.*${scenario.grep}`);
        }

    }

    const grep = grepParts.join("|");

    return `npx playwright test --project=${browser} --headed --workers=1 --grep "${grep}"`;
}

import { execSync } from "child_process";

export function runCommand(command) {
  execSync(command, {
    stdio: "inherit",
  });
}