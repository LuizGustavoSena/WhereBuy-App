import { ICacheClient } from "@src/data/protocols/cache/cache-client";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@src/data/protocols/http/http-client";
import { CacheEnum } from "@src/domain/enums/cache-enum";
import { env } from "@src/infrastructure/env";

export class AuthorizeHttpClientDecorator implements IHttpClient {
    constructor(
        private readonly cacheStorage: ICacheClient,
        private readonly httpClient: IHttpClient
    ) { }

    async request(data: HttpRequest): Promise<HttpResponse<any>> {
        var httpResponse;
        var count = 0;

        do {
            count++;

            const accessToken = this.cacheStorage.readByKey(CacheEnum.AUTH_CACHE);

            if (accessToken && accessToken.token) {
                Object.assign(data, {
                    headers: Object.assign(data.headers || {}, {
                        'Authorization': accessToken.token
                    })
                })
            }

            httpResponse = await this.httpClient.request(data);

            if (httpResponse.statusCode === HttpStatusCode.Unauthorized) {
                const response = await this.httpClient.request({
                    method: 'post',
                    url: `${env.EXPO_PUBLIC_URL_AUTH}/refresh-token`,
                    headers: { refresh_token: accessToken.refreshToken }
                });

                this.cacheStorage.create({
                    key: CacheEnum.AUTH_CACHE,
                    value: {
                        token: response.body.token,
                        refreshToken: response.body.refreshToken
                    }
                });
            }
        } while (httpResponse.statusCode !== HttpStatusCode.Unauthorized || count === 3);


        return httpResponse;
    }
}