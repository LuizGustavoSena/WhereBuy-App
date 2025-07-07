import { InvalidCredentialsError } from "@src/domain/errors/invalid-credentials";
import { CreateShoppingListProps, TypeAmountEnum } from "@src/domain/models/shopping-list";
import { IShoppingListValidation, ShoppingListMessageRequire, ShoppingListMessageType } from "@src/domain/validations/shopping-list-validation";
import { z, ZodError } from "zod";

export class ShoppingListValidationZod implements IShoppingListValidation {
    idSchema = z.string({
        required_error: ShoppingListMessageRequire.ID,
        invalid_type_error: ShoppingListMessageType.ID
    }).uuid({ message: ShoppingListMessageType.ID });

    nameSchema = z.string({
        required_error: ShoppingListMessageRequire.NAME,
        invalid_type_error: ShoppingListMessageType.NAME
    });

    amountSchema = z.number({
        required_error: ShoppingListMessageRequire.AMOUNT,
        invalid_type_error: ShoppingListMessageType.AMOUNT
    });

    typeAmountSchema = z.nativeEnum(TypeAmountEnum, {
        required_error: ShoppingListMessageRequire.TYPE_AMOUNT,
        invalid_type_error: ShoppingListMessageType.TYPE_AMOUNT
    });

    create(params: CreateShoppingListProps): void | Error {
        const validation = z.object({
            name: this.nameSchema,
            amount: this.amountSchema,
            typeAmount: this.typeAmountSchema
        });

        this.throwValidationError(() => validation.parse(params));
    }

    private throwValidationError(callback: Function) {
        try {
            callback();
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            if (error.errors.find(el => el.message.includes('Invalid enum value')))
                throw new InvalidCredentialsError(ShoppingListMessageType.TYPE_AMOUNT);

            throw new InvalidCredentialsError(error.errors.map(el => el.message).join(', '));
        }
    }
}