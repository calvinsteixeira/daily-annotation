interface IApiResponse {
    hasError: boolean;
    message: string;
    statusCode: number
}

export type { IApiResponse }