import { InvalidCredentialsError } from "@src/domain/errors/invalid-credentials";
import { SigninParams, SignupParams } from "@src/domain/models/auth";
import { AuthMessageRequire, AuthMessageType, IAuthValidation, MIN_LENGTH_PASSWORD } from "@src/domain/validations/auth-validation";
import { z, ZodError } from "zod";

export class AuthValidationZod implements IAuthValidation {
    schema = z.object({
        email: z.string({ required_error: AuthMessageRequire.EMAIL, invalid_type_error: AuthMessageType.EMAIL }).email({ message: AuthMessageType.EMAIL }),
        password: z.string({ required_error: AuthMessageRequire.PASSWORD, invalid_type_error: AuthMessageType.PASSWORD }).min(MIN_LENGTH_PASSWORD, { message: AuthMessageRequire.PASSWORD_LENGTH })
    });
    constructor() { }

    signup(params: SignupParams): void | Error {
        const signupSchema = this.schema.extend({
            name: z.string({ required_error: AuthMessageRequire.NAME, invalid_type_error: AuthMessageType.NAME })
        });

        this.throwValidationError(() => signupSchema.parse(params));
    }

    signin(params: SigninParams): void | Error {
        this.throwValidationError(() => this.schema.parse(params));
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