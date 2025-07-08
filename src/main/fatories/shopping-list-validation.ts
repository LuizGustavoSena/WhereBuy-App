import { ShoppingListValidationZod } from "@src/infrastructure/validations/shopping-list-validation-zod";

export const makeShoppingListValidation = (): ShoppingListValidationZod => new ShoppingListValidationZod();