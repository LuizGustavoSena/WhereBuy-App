import { ICacheClient } from "@src/data/protocols/cache/cache-client"
import { IHttpClient } from "@src/data/protocols/http/http-client"
import { AuthorizeHttpClientDecorator } from "@src/main/decorators/authorize-http-client-decorator"
import { HttpClientSpy } from "@test/data/mocks/mock-http"
import { CacheClientSpy } from "@test/data/mocks/mock-local-storage"
import { describe } from "vitest"

type SutTypes = {
    sut: AuthorizeHttpClientDecorator
    storageSpy: ICacheClient
    httpClientSpy: IHttpClient
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

});