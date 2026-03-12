export class InternalServerError extends Error {
  constructor({ cause, status_code }) {
    super("Um erro inespesperado ocorreu", { cause });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte";
    this.status_code = status_code || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.status_code,
      cause: this.cause,
    };
  }
}

export class ServiceError extends Error {
  constructor({ message, cause, status_code }) {
    super(message || "Serviço indisponível", { cause });
    this.name = "ServiceError";
    this.action = "Verifique se o serviço está disponível";
    this.status_code = status_code || 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.status_code,
      cause: this.cause,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido para este endpoint.");
    this.name = "MethodNotAllowedError";
    this.action =
      "Verifique se o método HTTP utilizado é válido para este endpoint.";
    this.status_code = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.status_code,
    };
  }
}
