import { IHttpClient } from "@src/data/protocols/http/http-client";
import { AxiosHttpClient } from "@src/infrastructure/http/axios-http-client";

export const makeHttpClient = (): IHttpClient => new AxiosHttpClient();