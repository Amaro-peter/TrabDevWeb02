export interface ErrorResponse {
    localDateTime: Date;
    errorCode: number;
    error: string;
    metodo: string;
    requestURI: string;
    map: {
        [key: string]: string
    };
    message: string;
}