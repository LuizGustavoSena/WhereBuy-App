import { ICacheClient } from "@src/data/protocols/cache/cache-client";
import { HttpRequest, HttpResponse, IHttpClient } from "@src/data/protocols/http/http-client";
import { CacheEnum } from "@src/domain/enums/cache-enum";


export class AuthorizeHttpClientDecorator implements IHttpClient {
    constructor(
        private readonly cacheStorage: ICacheClient,
        private readonly httpClient: IHttpClient
    ) { }

    async request(data: HttpRequest): Promise<HttpResponse<any>> {
        const accessToken = this.cacheStorage.readByKey(CacheEnum.AUTH_CACHE);

        if (accessToken) {
            Object.assign(data, {
                headers: Object.assign(data.headers || {}, {
                    'Authorization': accessToken.token
                })
            })
        }

        const httpResponse = await this.httpClient.request(data);

        return httpResponse;
    }
}