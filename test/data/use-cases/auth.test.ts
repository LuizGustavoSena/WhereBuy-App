import { HttpStatusCode } from "@src/data/protocols/http/http-client";
import AuthService from "@src/data/use-cases/auth";
import { InvalidCredentialsError } from "@src/domain/errors/invalid-credentials";
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

    it('Should be error when statusCode is differents to created', async () => {
        const { sut, httpClient } = makeSut();

        httpClient.response = {
            statusCode: makeHttpStatusCodeWithoutCreated()
        };

        const promise = sut.signin(makeSigninRequest());

        await expect(promise).rejects.toThrow(new InvalidCredentialsError());
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
});