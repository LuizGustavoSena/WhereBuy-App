export type ShoppingList = {
    id: string;
    name: string;
    amount: number;
    typeAmount: TypeAmountEnum;
    created: Date;
    userId: string;
}

export type CreateShoppingListProps = Omit<ShoppingList, 'id' | 'created'>;
export type CreateShoppingListResponse = { id: string };

export type GetAllShoppingListResult = Omit<ShoppingList, 'userId'>[];
export type GetByNameShoppingListResult = Omit<ShoppingList, 'userId'>[];

export type UpdateShoppingListProps = {
    id: string;
    data: Partial<Omit<ShoppingList, 'id' | 'created' | 'userId'>>
};
export type UpdateShoppingListResult = Omit<ShoppingList, 'userId'>;

export enum TypeAmountEnum {
    UNIT = 'unit',
    GRAMS = 'grams',
    LITERS = 'liters'
}