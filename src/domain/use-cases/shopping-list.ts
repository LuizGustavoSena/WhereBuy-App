import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult, GetByNameShoppingListResult, UpdateShoppingListProps, UpdateShoppingListResult } from "../models/shopping-list";

export interface IShoppingList {
    create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse>;
    getAll(): Promise<GetAllShoppingListResult>;
    getByName(name: string): Promise<GetByNameShoppingListResult>;
    update(params: UpdateShoppingListProps): Promise<UpdateShoppingListResult>
}