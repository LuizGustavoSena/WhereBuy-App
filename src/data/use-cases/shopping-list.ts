import { ServerError } from "@src/domain/errors/server-error";
import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult } from "@src/domain/models/shopping-list";
import { IShoppingList } from "@src/domain/use-cases/shopping-list";
import { env } from "@src/infrastructure/env";
import { HttpStatusCode, IHttpClient } from "../protocols/http/http-client";

export class ShoppingListService implements IShoppingList {
    constructor(
        private httpClient: IHttpClient
    ) { };

    create = async (params: CreateShoppingListProps): Promise<CreateShoppingListResponse> => {
        const response = await this.httpClient.request({
            method: 'post',
            url: `${env.URL_SHOPPING_LIST}`,
            body: params
        });

        if (response.statusCode !== HttpStatusCode.Created)
            throw new ServerError(response.body.message);

        return response.body;
    }

    getAll = async (): Promise<GetAllShoppingListResult> => {
        const response = await this.httpClient.request({
            method: 'get',
            url: `${env.URL_SHOPPING_LIST}`,
        });

        if (response.statusCode !== HttpStatusCode.Ok && response.statusCode !== HttpStatusCode.NoContent)
            throw new ServerError(response.body.message);

        return response.body;
    }
}