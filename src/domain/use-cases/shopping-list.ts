import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult } from "../models/shopping-list";

export interface IShoppingList {
    create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse>;
    getAll(): Promise<GetAllShoppingListResult>;
}