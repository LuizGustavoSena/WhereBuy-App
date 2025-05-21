import { HttpStatusCode } from "@src/data/protocols/http/http-client";
import AuthService from "@src/data/use-cases/auth";
import { makeSigninRequest, makeSigninResponse } from "@test/domain/mocks/mock-auth";
import { describe, expect, it } from "vitest";
import { HttpClientSpy } from "../mocks/mock-http";

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
})