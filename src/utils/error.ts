import { ErrorResponse } from "@custom-types/error"
import { AxiosError, AxiosResponse, isAxiosError } from "axios"

const parseErrorDetail = (error: ErrorResponse | undefined) => {
  if (!error || !error.detail) return "Something went wrong :("

  if (typeof error.detail === "string") return error.detail

  return error.detail.length > 0 ? error.detail[0].msg : "Something went wrong"
}

export const parseError = (
  r: AxiosError<ErrorResponse> | AxiosResponse<ErrorResponse>
) => {
  const data = isAxiosError(r) ? r.response?.data : r.data

  return parseErrorDetail(data)
}
