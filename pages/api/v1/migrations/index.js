import { createRouter } from "next-connect";
import controller from "infra/controller";
import migrator from "migrator";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(_, response) {
  const pendingMigrations = await migrator.listPendingMigrations();
  return response.status(200).json(pendingMigrations);
}

async function postHandler(_, response) {
  const appliedMigrations = await migrator.runPendingMigrations();

  if (appliedMigrations.length > 0) {
    return response.status(201).json(appliedMigrations);
  }

  return response.status(200).json(appliedMigrations);
}
