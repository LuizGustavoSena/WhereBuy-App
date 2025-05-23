import { SigninParams, SigninResponse, SignupParams } from "../models/auth";

export interface IAuth {
    signin(params: SigninParams): Promise<SigninResponse>;
    signup(params: SignupParams): Promise<boolean>;
}