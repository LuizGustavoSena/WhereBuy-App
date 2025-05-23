import { ServerError } from "@src/domain/errors/server-error";
import { SigninParams, SigninResponse, SignupParams } from "@src/domain/models/auth";
import { IAuth } from "@src/domain/use-cases/auth";
import { env } from "@src/infrastructure/env";
import { HttpStatusCode, IHttpClient } from "../protocols/http/http-client";

export default class AuthService implements IAuth {
    constructor(
        private httpClient: IHttpClient
    ) { };

    signin = async (params: SigninParams): Promise<SigninResponse> => {
        const response = await this.httpClient.request({
            method: 'post',
            url: `${env.URL_AUTH}/login_account`,
            body: params
        });

        if (response.statusCode === HttpStatusCode.Created)
            return { token: response.body.token };

        throw new ServerError(response.body.error);
    }

    signup = async (params: SignupParams): Promise<boolean> => {
        const response = await this.httpClient.request({
            method: 'post',
            url: `${env.URL_AUTH}/create_account`,
            body: params
        });

        if (response.statusCode !== HttpStatusCode.Created)
            throw new ServerError(response.body.error);

        return true;
    }
}