export enum HttpStatusCode {
    Ok = 200,
    NoContent = 204,
    BadRequest = 400,
    NotFound = 404,
    ServerError = 500,
    Unauthorized = 401,
    Created = 201,
    ServiceUnavailable = 503,
    PayloadTooLarge = 413
};

export type HttpRequest = {
    url: string;
    method: HttpMethod;
    headers?: any;
    body?: any;
}

type HttpMethod = 'post' | 'put' | 'get' | 'delete' | 'patch';

export interface IHttpClient {
    request<T = any>(params: HttpRequest): Promise<HttpResponse<T>>;
}

export type HttpResponse<T> = {
    statusCode: HttpStatusCode;
    body?: T;
}