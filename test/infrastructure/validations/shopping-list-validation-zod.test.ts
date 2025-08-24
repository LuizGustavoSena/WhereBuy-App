import { faker } from "@faker-js/faker";
import { TypeAmountEnum } from "@src/domain/models/shopping-list";
import { ShoppingListValidationZod } from "@src/infrastructure/validations/shopping-list-validation-zod";
import { makeShoppingListCreate } from "@test/domain/mocks/mock-shopping-list";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

const sut = new ShoppingListValidationZod();

describe('ShoppingListValidationZod', () => {
    it('Should be successful create shopping list item', () => {
        expect(sut.createSchema.safeParse(makeShoppingListCreate())).toHaveProperty('success', true);
    });

    it('Should be error when create shopping list item with incorrect name type', () => {
        const params = {
            typeAmount: faker.helpers.enumValue(TypeAmountEnum),
            name: faker.number.int(),
            amount: faker.number.int()
        };
        expect(() => sut.createSchema.parse(params)).toThrowError(ZodError);
    });

    it('Should be error when create shopping list item with incorrect amount type', () => {
        const params = {
            typeAmount: faker.helpers.enumValue(TypeAmountEnum),
            name: faker.person.fullName(),
            amount: faker.string.numeric()
        };
        expect(() => sut.createSchema.parse(params)).toThrowError(ZodError);
    });

    it('Should be error when create shopping list item with incorrect typeAmount type', () => {
        const params = {
            typeAmount: faker.string.sample(),
            name: faker.person.fullName(),
            amount: Number(faker.commerce.price())
        };
        expect(() => sut.createSchema.parse(params)).toThrowError(ZodError);
    });
});