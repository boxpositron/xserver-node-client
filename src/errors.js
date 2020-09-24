class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

class ServiceError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ServiceError'
  }
}

class ManagerError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ManagerError'
  }
}

module.exports = {
  ValidationError,
  ServiceError,
  ManagerError
}
