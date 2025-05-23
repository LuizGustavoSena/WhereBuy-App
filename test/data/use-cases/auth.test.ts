import { HttpStatusCode } from "@src/data/protocols/http/http-client";
import AuthService from "@src/data/use-cases/auth";
import { ServerError } from "@src/domain/errors/server-error";
import { makeSigninRequest, makeSigninResponse, makeSignupRequest } from "@test/domain/mocks/mock-auth";
import { describe, expect, it } from "vitest";
import { HttpClientSpy, makeHttpStatusCodeWithoutCreated } from "../mocks/mock-http";

type Props = {
    sut: AuthService;
    httpClient: HttpClientSpy;
}

const makeSut = (): Props => {
    const httpClient = new HttpClientSpy();
    const sut = new AuthService(httpClient);

    return {
        sut,
        httpClient
    }
}

describe('AuthService', () => {
    it('Should be successful to signin authentication', async () => {
        const { sut, httpClient } = makeSut();

        httpClient.response = {
            statusCode: HttpStatusCode.Created,
            body: makeSigninResponse()
        };

        const response = await sut.signin(makeSigninRequest());

        expect(response.token).not.toBeNull();
        expect(response.token).not.toBeUndefined();
    });

    it('Should be error when statusCode is differents to created in signin', async () => {
        const { sut, httpClient } = makeSut();

        const error = { message: 'Error when authenticate user' };

        httpClient.response = {
            statusCode: makeHttpStatusCodeWithoutCreated(),
            body: error
        };

        const promise = sut.signin(makeSigninRequest());

        await expect(promise).rejects.toThrow(new ServerError(error.message));
    });

    it('Should be successful to signup authentication', async () => {
        const { sut, httpClient } = makeSut();

        httpClient.response = {
            statusCode: HttpStatusCode.Created,
            body: makeSigninResponse()
        };

        const response = await sut.signup(makeSignupRequest());

        expect(response).toBeTruthy();
    });

    it('Should be error when statusCode is differents to created in signup', async () => {
        const { sut, httpClient } = makeSut();

        const error = { message: 'Error when create user' };

        httpClient.response = {
            statusCode: makeHttpStatusCodeWithoutCreated(),
            body: error
        };

        const promise = sut.signup(makeSignupRequest());

        await expect(promise).rejects.toThrow(new ServerError(error.message));
    });
});