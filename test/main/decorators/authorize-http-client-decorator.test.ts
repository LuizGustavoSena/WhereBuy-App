import { faker } from "@faker-js/faker"
import { CacheEnum } from "@src/domain/enums/cache-enum"
import { AuthorizeHttpClientDecorator } from "@src/main/decorators/authorize-http-client-decorator"
import { HttpClientSpy } from "@test/data/mocks/mock-http"
import { CacheClientSpy } from "@test/data/mocks/mock-local-storage"
import { mockRequest } from "@test/infrastructure/mocks/mock-axios"
import { describe, expect, it } from "vitest"

type SutTypes = {
    sut: AuthorizeHttpClientDecorator
    storageSpy: CacheClientSpy
    httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
    const storageSpy = new CacheClientSpy()
    const httpClientSpy = new HttpClientSpy()
    const sut = new AuthorizeHttpClientDecorator(storageSpy, httpClientSpy)
    return {
        sut,
        storageSpy,
        httpClientSpy
    }
}

describe('AuthorizeHttpClientDecorator', () => {
    it('Should be call GetStorage with correct value', async () => {
        const { sut, storageSpy } = makeSut();

        await sut.request(mockRequest());

        expect(storageSpy.params.key).toBe(CacheEnum.AUTH_CACHE);
    });

    it('Should not add headers if GetStorage is invalid', async () => {
        const { sut, httpClientSpy } = makeSut();
        const httpRequest = mockRequest();

        httpRequest.headers = {
            field: faker.string.sample()
        };

        await sut.request(httpRequest);

        expect(httpClientSpy.url).toBe(httpRequest.url);
        expect(httpClientSpy.method).toBe(httpRequest.method);
        expect(httpClientSpy.headers).toEqual(httpRequest.headers);
    });

    it('Should be successfull add headers to HttpClient', async () => {
        const { sut, storageSpy, httpClientSpy } = makeSut();

        storageSpy.response = faker.string.uuid();
        const httpRequest = mockRequest();

        await sut.request(httpRequest);

        expect(httpClientSpy.url).toBe(httpRequest.url);
        expect(httpClientSpy.method).toBe(httpRequest.method);
        expect(httpClientSpy.headers).toEqual({
            'Authorization': storageSpy.response
        });
    });

    it('Should be successfull merge headers to HttpClient', async () => {
        const { sut, storageSpy, httpClientSpy } = makeSut();

        const field = faker.string.sample();
        const httpRequest = mockRequest();

        storageSpy.response = faker.string.uuid();
        httpRequest.headers = { field };

        await sut.request(httpRequest);

        expect(httpClientSpy.url).toBe(httpRequest.url);
        expect(httpClientSpy.method).toBe(httpRequest.method);
        expect(httpClientSpy.headers).toEqual({
            field,
            'Authorization': storageSpy.response
        });
    });
});