import { SigninParams } from "../models/auth";

export enum AuthMessageRequire {
    EMAIL = 'O campo email deve ser preenchido',
    PASSWORD = 'O campo password deve ser preenchido',
}

export enum AuthMessageType {
    EMAIL = 'O campo email deve ser do tipo string',
    PASSWORD = 'O campo password deve ser do tipo string',
}
export interface IAuthValidation {
    signin(params: SigninParams): void | Error;
}