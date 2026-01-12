test("GET /api/v1/status", async () => {
  const response = await fetch("http://localhost:3001/api/v1/status");

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(parsedUpdatedAt).toBe(responseBody.updated_at);

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toEqual("16.0");

  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  expect(responseBody.dependencies.database.active_connections).toBeDefined();
  expect(responseBody.dependencies.database.active_connections).toEqual(1);
});
