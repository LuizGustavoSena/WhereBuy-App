import { SigninParams, SigninResponse } from "../models/auth";

export interface IAuth {
    signin(params: SigninParams): Promise<SigninResponse>;
}