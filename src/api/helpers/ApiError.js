export default class ApiError extends Error {
  constructor(error) {
    super(error);
    this._error = {
      status: error.status,
    };
    this.message = error.message;
  }

  toString() {
    return this._error.status.toString;
  }
}