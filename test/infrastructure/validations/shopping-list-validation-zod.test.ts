import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "@src/domain/errors/invalid-credentials";
import { TypeAmountEnum } from "@src/domain/models/shopping-list";
import { ShoppingListMessageType } from "@src/domain/validations/shopping-list-validation";
import { ShoppingListValidationZod } from "@src/infrastructure/validations/shopping-list-validation-zod";
import { makeShoppingListCreate } from "@test/domain/mocks/mock-shopping-list";
import { describe, expect, it } from "vitest";

const sut = new ShoppingListValidationZod();

describe('ShoppingListValidationZod', () => {
    it('Should be successful create shopping list item', () => {
        expect(sut.create(makeShoppingListCreate())).toBeUndefined();
    });

    it('Should be error when create shopping list item with incorrect name type', () => {
        const params = {
            typeAmount: faker.helpers.enumValue(TypeAmountEnum),
            name: faker.number.int(),
            amount: faker.number.int()
        };
        // @ts-expect-error
        expect(() => sut.create(params)).toThrow(new InvalidCredentialsError(ShoppingListMessageType.NAME));
    });

    it('Should be error when create shopping list item with incorrect amount type', () => {
        const params = {
            typeAmount: faker.helpers.enumValue(TypeAmountEnum),
            name: faker.person.fullName(),
            amount: faker.string.numeric()
        };
        // @ts-expect-error
        expect(() => sut.create(params)).toThrow(new InvalidCredentialsError(ShoppingListMessageType.AMOUNT));
    });

    it('Should be error when create shopping list item with incorrect typeAmount type', () => {
        const params = {
            typeAmount: faker.string.sample(),
            name: faker.person.fullName(),
            amount: Number(faker.commerce.price())
        };
        // @ts-expect-error
        expect(() => sut.create(params)).toThrow(new InvalidCredentialsError(ShoppingListMessageType.TYPE_AMOUNT));
    });
});