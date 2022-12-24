type ValidationError = {
  msg: string
}

export type ErrorResponse = {
  detail: ValidationError[] | string
}
