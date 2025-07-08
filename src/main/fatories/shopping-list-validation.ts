import { IShoppingListValidation } from "@src/domain/validations/shopping-list-validation";
import { ShoppingListValidationZod } from "@src/infrastructure/validations/shopping-list-validation-zod";

export const makeShoppingListValidation = (): IShoppingListValidation => new ShoppingListValidationZod();