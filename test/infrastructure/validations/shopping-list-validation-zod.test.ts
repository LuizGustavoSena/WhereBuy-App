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
});