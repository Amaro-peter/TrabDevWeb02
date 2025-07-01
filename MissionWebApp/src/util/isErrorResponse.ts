import type { ErrorResponse } from "../interface/ErrorResponse";


function isErrorResponse(error: any): error is ErrorResponse {
    return error && typeof error.requestURI === "string";
}
export default isErrorResponse;