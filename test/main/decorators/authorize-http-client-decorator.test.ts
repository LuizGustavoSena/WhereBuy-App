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
    })
});