import { InvalidCredentialsError } from "@src/domain/errors/invalid-credentials";
import { SigninParams, SigninResponse } from "@src/domain/models/auth";
import { IAuth } from "@src/domain/use-cases/auth";
import { env } from "@src/infrastructure/env";
import { HttpStatusCode, IHttpClient } from "../protocols/http/http-client";

export default class AuthService implements IAuth {
    constructor(
        private httpClient: IHttpClient
    ) { };

    async signin(params: SigninParams): Promise<SigninResponse> {
        const user = await this.httpClient.request({
            method: 'post',
            url: `${env.URL_AUTH}`,
            body: params
        });

        if (user.statusCode === HttpStatusCode.Created)
            return { token: user.body };

        throw new InvalidCredentialsError();
    }
}