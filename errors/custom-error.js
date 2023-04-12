
class CustomAPIError extends Error {
  constructor(message, status_code) {
    super(message);
    this.status_code = status_code
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
}

module.exports = {
  createCustomError,
  CustomAPIError
}
