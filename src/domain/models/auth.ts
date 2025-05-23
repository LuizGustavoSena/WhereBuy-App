export type SigninParams = {
    email: string;
    password: string;
}

export type SigninResponse = {
    token: string;
}

export type SignupParams = {
    email: string;
    password: string;
    name: string;
}