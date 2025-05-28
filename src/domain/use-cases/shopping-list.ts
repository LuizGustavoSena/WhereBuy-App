import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult, GetByNameShoppingListResult } from "../models/shopping-list";

export interface IShoppingList {
    create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse>;
    getAll(): Promise<GetAllShoppingListResult>;
    getByName(name: string): Promise<GetByNameShoppingListResult>
}