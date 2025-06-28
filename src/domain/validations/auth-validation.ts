import { SigninParams, SignupParams } from "../models/auth";

export const MIN_LENGTH_PASSWORD = 5;

export enum AuthMessageRequire {
    EMAIL = 'O email deve ser preenchido',
    PASSWORD = 'A senha deve ser preenchido',
    PASSWORD_LENGTH = `A senha deve ser de no mínimo ${MIN_LENGTH_PASSWORD} caracteres`,
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