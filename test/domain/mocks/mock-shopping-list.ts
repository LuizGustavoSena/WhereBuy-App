import { faker } from "@faker-js/faker";
import { CreateShoppingListProps, ShoppingList, TypeAmountEnum, UpdateShoppingListProps } from "@src/domain/models/shopping-list";

export const makeShoppingListCreate = (params?: Partial<CreateShoppingListProps>): CreateShoppingListProps => ({
    amount: params?.amount ?? Number(faker.commerce.price()),
    name: params?.name ?? faker.commerce.productName(),
    typeAmount: params?.typeAmount ?? faker.helpers.enumValue(TypeAmountEnum),
    userId: params?.userId ?? faker.string.uuid()
});

export const makeShoppingListItem = (params?: Partial<Omit<ShoppingList, 'userId'>>): Omit<ShoppingList, 'userId'> => ({
    amount: params?.amount ?? Number(faker.commerce.price()),
    created: params?.created ?? faker.date.past(),
    id: params?.id ?? faker.string.uuid(),
    name: params?.name ?? faker.commerce.productName(),
    typeAmount: params?.typeAmount ?? faker.helpers.enumValue(TypeAmountEnum)
});

export const makeShoppingListUpdate = (params?: Partial<UpdateShoppingListProps>): UpdateShoppingListProps => ({
    id: params?.id ?? faker.string.uuid(),
    data: {
        amount: params?.data?.amount ?? Number(faker.commerce.price()),
        name: params?.data?.name ?? faker.commerce.productName(),
        typeAmount: params?.data?.typeAmount ?? faker.helpers.enumValue(TypeAmountEnum)
    }
})