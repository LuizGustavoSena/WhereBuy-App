import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@src/data/protocols/http/http-client";

export class HttpClientSpy implements IHttpClient {
    url?: string;
    method?: string;
    body?: any;
    headers?: any;
    response: HttpResponse<any> = {
        statusCode: HttpStatusCode.Ok
    }

    async request<R>(params: HttpRequest): Promise<HttpResponse<R>> {
        const { method, url, body, headers } = params;

        this.url = url;
        this.method = method;
        this.body = body;
        this.headers = headers;

        return this.response as HttpResponse<R>;
    }
}