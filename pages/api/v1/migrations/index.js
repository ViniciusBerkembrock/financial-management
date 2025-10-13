import migrationRunner from "node-pg-migrate";
import { join } from "path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultOptions = {
    dbClient,
    dir: join("infra", "migrations"),
    dryRun: true,
    direction: "up",
    verbose: true,
    migrationTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner({
      ...defaultOptions,
    });

    dbClient.end();

    response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const appliedMigrations = await migrationRunner({
      ...defaultOptions,
      dryRun: false, //live run
    });

    dbClient.end();

    if (appliedMigrations.length > 0) {
      return response.status(201).json(appliedMigrations);
    }

    return response.status(200).json(appliedMigrations);
  }

  response.status(405).end();
}
