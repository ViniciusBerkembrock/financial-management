import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

test("POST /api/v1/migrations", async () => {
  const responseF = await fetch("http://localhost:3001/api/v1/migrations", {
    method: "POST",
  });
  expect(responseF.status).toBe(201);

  const responseFBody = await responseF.json();
  expect(Array.isArray(responseFBody)).toBe(true);

  expect(responseFBody.length).toBeGreaterThan(0);

  const responseS = await fetch("http://localhost:3001/api/v1/migrations", {
    method: "POST",
  });
  expect(responseS.status).toBe(200);

  const responseSBody = await responseS.json();
  expect(Array.isArray(responseSBody)).toBe(true);

  expect(responseSBody.length).toBe(0);
});
