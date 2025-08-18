export type SigninParams = {
    email: string;
    password: string;
}

export type SigninResponse = {
    token: string;
    refreshToken: string;
}

export type SignupParams = {
    email: string;
    password: string;
    name: string;
}