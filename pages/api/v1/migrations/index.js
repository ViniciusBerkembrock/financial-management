import migrationRunner from "node-pg-migrate";
import { createRouter } from "next-connect";
import { resolve } from "node:path";
import database from "infra/database";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(_, response) {
  const pendingMigrations = await runMigrations({ dryRun: true });
  return response.status(200).json(pendingMigrations);
}

async function postHandler(_, response) {
  const appliedMigrations = await runMigrations({ dryRun: false });

  if (appliedMigrations.length > 0) {
    return response.status(201).json(appliedMigrations);
  }

  return response.status(200).json(appliedMigrations);
}

async function runMigrations({ dryRun }) {
  const dbClient = await database.getNewClient();

  const defaultOptions = {
    dbClient,
    dir: resolve("infra", "migrations"),
    dryRun: dryRun,
    direction: "up",
    verbose: true,
    migrationTable: "pgmigrations",
  };

  try {
    const appliedMigrations = await migrationRunner({
      ...defaultOptions,
    });

    return appliedMigrations;
  } finally {
    await dbClient.end();
  }
}
