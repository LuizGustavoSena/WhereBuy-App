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

export enum TypeAmountEnum {
    UNIT = 'unit',
    GRAMS = 'grams',
    LITERS = 'liters'
}