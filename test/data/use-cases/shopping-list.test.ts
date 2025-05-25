import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "@src/data/protocols/http/http-client";
import { ShoppingListService } from "@src/data/use-cases/shopping-list";
import { HttpClientSpy } from "@test/data/mocks/mock-http";
import { makeShoppingListCreate } from "@test/domain/mocks/mock-shopping-list";
import { describe, expect, it } from "vitest";

type Props = {
    httpClient: HttpClientSpy;
    sut: ShoppingListService
}

const makeSut = (): Props => {
    const httpClient = new HttpClientSpy();
    const sut = new ShoppingListService(httpClient);

    return {
        sut,
        httpClient
    }
}

describe('ShoppingListService', () => {
    it('Should be correct verbs in httpClient', async () => {
        const { httpClient, sut } = makeSut();

        httpClient.response.statusCode = HttpStatusCode.Created

        const request = makeShoppingListCreate()

        await sut.create(request);

        expect(httpClient.method).toBe('post');
        expect(httpClient.url).not.toBeNull();
        expect(httpClient.url).not.toBeUndefined();
        expect(httpClient.body).toEqual(request);
    });

    it('Should be successfull create shopping list item', async () => {
        const { httpClient, sut } = makeSut();

        const id = faker.string.uuid();

        httpClient.response = {
            statusCode: HttpStatusCode.Created,
            body: { id }
        };

        const response = await sut.create(makeShoppingListCreate());

        expect(response.id).toBe(id);
    });
});