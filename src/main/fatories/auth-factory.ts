import AuthUseCase from "@src/data/use-cases/auth";
import { makeHttpClient } from "./http-client-factory";

export const makeAuth = (): AuthUseCase => new AuthUseCase(makeHttpClient())