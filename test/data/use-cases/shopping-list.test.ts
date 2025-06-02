import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "@src/data/protocols/http/http-client";
import { ShoppingListService } from "@src/data/use-cases/shopping-list";
import { ItemNotFoundError } from "@src/domain/errors/item-not-found-error";
import { ServerError } from "@src/domain/errors/server-error";
import { HttpClientSpy, makeHttpStatusCodeWithoutCreated, makeHttpStatusCodeWithoutCreatedAndOk, makeHttpStatusCodeWithoutOkAndNotFound } from "@test/data/mocks/mock-http";
import { makeShoppingListCreate, makeShoppingListItem, makeShoppingListUpdate } from "@test/domain/mocks/mock-shopping-list";
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
    it('Should be correct verbs when call create in httpClient', async () => {
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

    it('Should be api error when create shopping list item', async () => {
        const { httpClient, sut } = makeSut();

        const error = { message: 'Error when create shopping list item' };

        httpClient.response = {
            statusCode: makeHttpStatusCodeWithoutCreated(),
            body: error
        };

        const promise = sut.create(makeShoppingListCreate());

        await expect(promise).rejects.toThrow(new ServerError(error.message));
    });

    it('Should be correct verbs when call getAll in httpClient', async () => {
        const { httpClient, sut } = makeSut();

        await sut.getAll();

        expect(httpClient.method).toBe('get');
        expect(httpClient.url).not.toBeNull();
        expect(httpClient.url).not.toBeUndefined();
    });

    it('Should be successful getAll return a empty list', async () => {
        const { httpClient, sut } = makeSut();

        httpClient.response = {
            statusCode: HttpStatusCode.NoContent,
            body: []
        };

        const response = await sut.getAll();

        expect(response).toHaveLength(0);
    });

    it('Should be successful getAll', async () => {
        const { httpClient, sut } = makeSut();

        const shoppingItem = makeShoppingListItem();

        httpClient.response = {
            statusCode: HttpStatusCode.Ok,
            body: [shoppingItem]
        };

        const response = await sut.getAll();

        expect(response).toHaveLength(1);
        expect(response[0]).toEqual(shoppingItem);
    });

    it('Should be api error when getAll shopping list items', async () => {
        const { httpClient, sut } = makeSut();

        const error = { message: 'Error when create shopping list item' };

        httpClient.response = {
            statusCode: makeHttpStatusCodeWithoutCreatedAndOk(),
            body: error
        };

        const promise = sut.getAll();

        await expect(promise).rejects.toThrow(new ServerError(error.message));
    });

    it('Should be correct verbs when call getByName in httpClient', async () => {
        const { httpClient, sut } = makeSut();

        const name = faker.commerce.productName();

        await sut.getByName(name);

        expect(httpClient.method).toBe('get');
        expect(httpClient.url).not.toBeNull();
        expect(httpClient.url).not.toBeUndefined();
        expect(httpClient.url).includes(`name=${name}`);
    });

    it('Should be successful getByName', async () => {
        const { httpClient, sut } = makeSut();

        const shoppingItem = makeShoppingListItem();

        httpClient.response = {
            statusCode: HttpStatusCode.Ok,
            body: [shoppingItem]
        };

        const response = await sut.getByName(faker.commerce.productName());

        expect(response).toHaveLength(1);
        expect(response[0]).toEqual(shoppingItem);
    });

    it('Should be api error when getByName shopping list items', async () => {
        const { httpClient, sut } = makeSut();

        const error = { message: 'Error when create shopping list item' };

        httpClient.response = {
            statusCode: makeHttpStatusCodeWithoutCreatedAndOk(),
            body: error
        };

        const promise = sut.getByName(faker.commerce.productName());

        await expect(promise).rejects.toThrow(new ServerError(error.message));
    });

    it('Should be correct verbs when call update in httpClient', async () => {
        const { httpClient, sut } = makeSut();

        const request = makeShoppingListUpdate();

        await sut.update(request);

        expect(httpClient.method).toBe('patch');
        expect(httpClient.url).includes(`/${request.id}`);
        expect(httpClient.body).toEqual(request.data);
    });

    it('Should be successful update', async () => {
        const { httpClient, sut } = makeSut();

        const shoppingItem = makeShoppingListItem();

        httpClient.response = {
            statusCode: HttpStatusCode.Ok,
            body: shoppingItem
        };

        const response = await sut.update(makeShoppingListUpdate());

        expect(response).toEqual(shoppingItem);
    });

    it('Should be api error when update shopping list item', async () => {
        const { httpClient, sut } = makeSut();

        const error = { message: 'Error when update shopping list item' };

        httpClient.response = {
            statusCode: makeHttpStatusCodeWithoutOkAndNotFound(),
            body: error
        };

        const promise = sut.update(makeShoppingListUpdate());

        await expect(promise).rejects.toThrow(new ServerError(error.message));
    });

    it('Should be error when update shopping list item non existent', async () => {
        const { httpClient, sut } = makeSut();

        const error = { message: 'Error when update shopping list item' };

        httpClient.response = {
            statusCode: HttpStatusCode.NotFound,
            body: error
        };

        const promise = sut.update(makeShoppingListUpdate());

        await expect(promise).rejects.toThrow(new ItemNotFoundError());
    });

    it('Should be correct verbs when call deleteById in httpClient', async () => {
        const { httpClient, sut } = makeSut();

        const id = faker.string.uuid();

        await sut.deleteById(id);

        expect(httpClient.method).toBe('delete');
        expect(httpClient.url).includes(`/${id}`);
    });

    it('Should be successful deleteById', async () => {
        const { sut } = makeSut();

        const promise = sut.deleteById(faker.string.uuid());

        await expect(promise).resolves.toBeUndefined();
    });

    it('Should be error when delete shopping list item non existent', async () => {
        const { httpClient, sut } = makeSut();

        const error = { message: 'Error when delete shopping list item' };

        httpClient.response = {
            statusCode: HttpStatusCode.NotFound,
            body: error
        };

        const promise = sut.deleteById(faker.string.uuid());

        await expect(promise).rejects.toThrow(new ItemNotFoundError());
    });
});