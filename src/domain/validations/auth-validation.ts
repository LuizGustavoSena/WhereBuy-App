import { SigninParams, SignupParams } from "../models/auth";

export enum AuthMessageRequire {
    EMAIL = 'O campo email deve ser preenchido',
    PASSWORD = 'O campo password deve ser preenchido',
    NAME = 'O campo name deve ser preenchido',
}

export enum AuthMessageType {
    EMAIL = 'O campo email deve ser do tipo string',
    PASSWORD = 'O campo password deve ser do tipo string',
    NAME = 'O campo name deve ser do tipo string',
}
export interface IAuthValidation {
    signin(params: SigninParams): void | Error;
    signup(params: SignupParams): void | Error;
}