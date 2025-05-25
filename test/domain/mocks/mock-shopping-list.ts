import { faker } from "@faker-js/faker";
import { CreateShoppingListProps, TypeAmountEnum } from "@src/domain/models/shopping-list";

export const makeShoppingListCreate = (params?: Partial<CreateShoppingListProps>): CreateShoppingListProps => ({
    amount: params?.amount ?? Number(faker.commerce.price()),
    name: params?.name ?? faker.commerce.productName(),
    typeAmount: params?.typeAmount ?? faker.helpers.enumValue(TypeAmountEnum),
    userId: params?.userId ?? faker.string.uuid()
});