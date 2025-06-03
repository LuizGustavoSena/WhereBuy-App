import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "@src/data/protocols/http/http-client";
import AuthUseCase from "@src/data/use-cases/auth";
import { ServerError } from "@src/domain/errors/server-error";
import { makeSigninRequest, makeSigninResponse, makeSignupRequest } from "@test/domain/mocks/mock-auth";
import { describe, expect, it } from "vitest";
import { HttpClientSpy, makeHttpStatusCodeWithoutCreated } from "../mocks/mock-http";

type Props = {
    sut: AuthUseCase;
    httpClient: HttpClientSpy;
}

const makeSut = (): Props => {
    const httpClient = new HttpClientSpy();
    const sut = new AuthUseCase(httpClient);

    return {
        sut,
        httpClient
    }
}

describe('AuthUseCase', () => {
    it('Should be correct verbs in signin httpClient', async () => {
        const { sut, httpClient } = makeSut();

        httpClient.response = {
            statusCode: HttpStatusCode.Created,
            body: { token: faker.internet.jwt() }
        };

        const request = makeSigninRequest();

        await sut.signin(request);

        expect(httpClient.method).toBe('post');
        expect(httpClient.url).not.toBeNull();
        expect(httpClient.url).not.toBeUndefined();
        expect(httpClient.body).toEqual(request);
    });

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

    it('Should be api error in signin', async () => {
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

        const promise = sut.signup(makeSignupRequest());

        await expect(promise).resolves.toBeUndefined();
    });

    it('Should be api error in signup', async () => {
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