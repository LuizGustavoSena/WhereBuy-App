import { InvalidCredentialsError } from "@src/domain/errors/invalid-credentials";
import { SigninParams } from "@src/domain/models/auth";
import { AuthMessageRequire, AuthMessageType, IAuthValidation } from "@src/domain/validations/auth-validation";
import { z, ZodError } from "zod";

export class AuthValidationZod implements IAuthValidation {
    constructor() { };

    signin(props: SigninParams): void | Error {
        const schema = z.object({
            email: z.string({ required_error: AuthMessageRequire.EMAIL, invalid_type_error: AuthMessageType.EMAIL }).email({ message: AuthMessageType.EMAIL }),
            password: z.string({ required_error: AuthMessageRequire.PASSWORD, invalid_type_error: AuthMessageType.PASSWORD }).min(5)
        });

        this.throwValidationError(() => schema.parse(props));
    }

    private throwValidationError(callback: Function) {
        try {
            callback();
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            throw new InvalidCredentialsError(error.errors.map(el => el.message).join(', '));
        }
    }
}