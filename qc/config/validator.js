export function validateConfigs(clients, scenarios) {
  const errors = [];
  const clientIds = new Set();
  const clientTags = new Set();
  const scenarioIds = new Set();

  if (!Array.isArray(clients) || clients.length === 0) {
    errors.push("Clients configuration must be a non-empty array.");
  } else {
    clients.forEach((client, idx) => {
      const label = client.name || client.id || `Client at index ${idx}`;

      if (!client.id || typeof client.id !== "string") {
        errors.push(`${label}: Missing or invalid 'id' property.`);
      } else if (clientIds.has(client.id)) {
        errors.push(`Duplicate client id found: '${client.id}'.`);
      } else {
        clientIds.add(client.id);
      }

      if (!client.name || typeof client.name !== "string") {
        errors.push(`${label}: Missing or invalid 'name' property.`);
      }

      if (!client.tag || typeof client.tag !== "string") {
        errors.push(`${label}: Missing or invalid 'tag' property.`);
      } else if (clientTags.has(client.tag)) {
        errors.push(`Duplicate client tag found: '${client.tag}'.`);
      } else {
        clientTags.add(client.tag);
      }

      if (typeof client.oneWay !== "boolean") {
        errors.push(`${label}: 'oneWay' flag must be a boolean.`);
      }
      if (typeof client.roundTrip !== "boolean") {
        errors.push(`${label}: 'roundTrip' flag must be a boolean.`);
      }
      if (typeof client.connecting !== "boolean") {
        errors.push(`${label}: 'connecting' flag must be a boolean.`);
      }
    });
  }

  if (!Array.isArray(scenarios) || scenarios.length === 0) {
    errors.push("Scenarios configuration must be a non-empty array.");
  } else {
    scenarios.forEach((scenario, idx) => {
      const label = scenario.name || scenario.id || `Scenario at index ${idx}`;

      if (!scenario.id || typeof scenario.id !== "string") {
        errors.push(`${label}: Missing or invalid 'id' property.`);
      } else if (scenarioIds.has(scenario.id)) {
        errors.push(`Duplicate scenario id found: '${scenario.id}'.`);
      } else {
        scenarioIds.add(scenario.id);
      }

      if (!scenario.name || typeof scenario.name !== "string") {
        errors.push(`${label}: Missing or invalid 'name' property.`);
      }

      if (!scenario.grep || typeof scenario.grep !== "string") {
        errors.push(`${label}: Missing or invalid 'grep' property.`);
      }

      if (typeof scenario.supports !== "function") {
        errors.push(`${label}: 'supports' property must be a function.`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
