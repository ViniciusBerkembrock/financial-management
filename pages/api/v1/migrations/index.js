import migrationRunner from "node-pg-migrate";
import { join } from "path";
import database from "infra/database";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

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

      response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const appliedMigrations = await migrationRunner({
        ...defaultOptions,
        dryRun: false, //live run
      });

      if (appliedMigrations.length > 0) {
        return response.status(201).json(appliedMigrations);
      }

      return response.status(200).json(appliedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
