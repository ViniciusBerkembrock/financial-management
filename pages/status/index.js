import useSWR from "swr";

async function fetchStatus(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
    refreshInterval: 1000,
    dedupingInterval: 1000,
  });

  let updatedAt = "Carregando...";

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return (
    <>
      <div>Updated at: {updatedAt}</div>
    </>
  );
}

function Dependencies() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
    refreshInterval: 1000,
    dedupingInterval: 1000,
  });

  let databaseVersion = "Carregando...";
  let databaseMaxConnections = "Carregando...";
  let databaseActiveConnections = "Carregando...";

  if (!isLoading && data) {
    databaseVersion = data.dependencies.database.version;
    databaseMaxConnections = data.dependencies.database.max_connections;
    databaseActiveConnections = data.dependencies.database.active_connections;
  }

  return (
    <>
      <div>Database Version: {databaseVersion}</div>
      <div>Database Max Connections: {databaseMaxConnections}</div>
      <div>Database Active Connections: {databaseActiveConnections}</div>
    </>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <Dependencies />
    </>
  );
}
