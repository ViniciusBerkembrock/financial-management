import { MethodNotAllowedError, InternalServerError } from "./errors";

function onNoMatchHandler(_, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.status_code).json(publicErrorObject);
}

function onErrorHandler(error, _, response) {
  const publicErrorObject = new InternalServerError({
    status_code: error.status_code,
    cause: error,
  });
  response.status(publicErrorObject.status_code).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
