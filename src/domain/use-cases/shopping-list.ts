import { CreateShoppingListProps, CreateShoppingListResponse } from "../models/shopping-list";

export interface IShoppingList {
    create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse>;
}