import { ShoppingListUseCase } from "@src/data/use-cases/shopping-list";
import { makeHttpClient } from "./http-client-factory";

export const makeShoppingList = (): ShoppingListUseCase => new ShoppingListUseCase(makeHttpClient());