import { ItemNotFoundError } from "@src/domain/errors/item-not-found-error";
import { ServerError } from "@src/domain/errors/server-error";
import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult, GetByNameShoppingListResult, UpdateShoppingListProps, UpdateShoppingListResult } from "@src/domain/models/shopping-list";
import { IShoppingList } from "@src/domain/use-cases/shopping-list";
import { env } from "@src/infrastructure/env";
import { HttpStatusCode, IHttpClient } from "../protocols/http/http-client";

export class ShoppingListUseCase implements IShoppingList {
    constructor(
        private httpClient: IHttpClient
    ) { };

    create = async (params: CreateShoppingListProps): Promise<CreateShoppingListResponse> => {
        const response = await this.httpClient.request({
            method: 'post',
            url: `${env.EXPO_PUBLIC_URL_SHOPPING_LIST}`,
            body: params
        });

        if (response.statusCode !== HttpStatusCode.Created)
            throw new ServerError(response.body.message);

        return response.body;
    }

    getAll = async (): Promise<GetAllShoppingListResult> => {
        const response = await this.httpClient.request({
            method: 'get',
            url: `${env.EXPO_PUBLIC_URL_SHOPPING_LIST}`,
        });

        if (response.statusCode !== HttpStatusCode.Ok && response.statusCode !== HttpStatusCode.NoContent)
            throw new ServerError(response.body.message);

        return response.body;
    };

    getByName = async (name: string): Promise<GetByNameShoppingListResult> => {
        const response = await this.httpClient.request({
            method: 'get',
            url: `${env.EXPO_PUBLIC_URL_SHOPPING_LIST}?name=${name}`,
        });

        if (response.statusCode !== HttpStatusCode.Ok && response.statusCode !== HttpStatusCode.NoContent)
            throw new ServerError(response.body.message);

        return response.body;
    };

    update = async ({ id, data }: UpdateShoppingListProps): Promise<UpdateShoppingListResult> => {
        const response = await this.httpClient.request({
            method: 'patch',
            url: `${env.EXPO_PUBLIC_URL_SHOPPING_LIST}/${id}`,
            body: data
        });

        if (response.statusCode === HttpStatusCode.NotFound)
            throw new ItemNotFoundError();

        if (response.statusCode !== HttpStatusCode.Ok)
            throw new ServerError(response.body.message);

        return response.body;
    }

    deleteById = async (id: string): Promise<void> => {
        const response = await this.httpClient.request({
            method: 'delete',
            url: `${env.EXPO_PUBLIC_URL_SHOPPING_LIST}/${id}`
        });

        if (response.statusCode === HttpStatusCode.NotFound)
            throw new ItemNotFoundError();

        if (response.statusCode !== HttpStatusCode.Ok)
            throw new ServerError(response.body.message);
    }
}