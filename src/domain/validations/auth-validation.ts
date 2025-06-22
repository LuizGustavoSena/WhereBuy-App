import { SigninParams } from "../models/auth";

export interface IAuthValidation {
    login(params: SigninParams): void | Error;
}