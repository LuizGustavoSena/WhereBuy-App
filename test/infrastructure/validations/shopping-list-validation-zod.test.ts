import { ShoppingListValidationZod } from "@src/infrastructure/validations/shopping-list-validation-zod";
import { makeShoppingListCreate } from "@test/domain/mocks/mock-shopping-list";
import { describe, expect, it } from "vitest";

const sut = new ShoppingListValidationZod();

describe('ShoppingListValidationZod', () => {
    it('Should be successful create shopping list item', () => {
        expect(sut.create(makeShoppingListCreate())).toBeUndefined();
    });
});