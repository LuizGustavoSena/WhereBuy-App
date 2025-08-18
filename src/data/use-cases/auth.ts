import { CacheEnum } from "@src/domain/enums/cache-enum";
import { ServerError } from "@src/domain/errors/server-error";
import { SigninParams, SigninResponse, SignupParams } from "@src/domain/models/auth";
import { IAuth } from "@src/domain/use-cases/auth";
import { env } from "@src/infrastructure/env";
import { ICacheClient } from "../protocols/cache/cache-client";
import { HttpStatusCode, IHttpClient } from "../protocols/http/http-client";

export default class AuthUseCase implements IAuth {
    constructor(
        private httpClient: IHttpClient,
        private readonly cacheStorage: ICacheClient,
    ) { };

    signin = async (params: SigninParams): Promise<SigninResponse> => {
        const response = await this.httpClient.request({
            method: 'post',
            url: `${env.EXPO_PUBLIC_URL_AUTH}/login_account`,
            body: params
        });

        if (response.statusCode !== HttpStatusCode.Created)
            throw new ServerError(response.body.message);

        this.cacheStorage.create({
            key: CacheEnum.AUTH_CACHE,
            value: {
                token: response.body.token,
                refreshToken: response.body.refreshToken
            }
        });

        return {
            token: response.body.token,
            refreshToken: response.body.refreshToken
        };

    }

    signup = async (params: SignupParams): Promise<void> => {
        const response = await this.httpClient.request({
            method: 'post',
            url: `${env.EXPO_PUBLIC_URL_AUTH}/create_account`,
            body: params
        });

        if (response.statusCode !== HttpStatusCode.Created)
            throw new ServerError(response.body.message);
    }
}