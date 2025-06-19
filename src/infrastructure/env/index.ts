import { InvalidEnvError } from "@src/domain/errors/invalid-env";
import { z } from "zod";

const envSchema = z.object({
    EXPO_PUBLIC_URL_AUTH: z.string(),
    EXPO_PUBLIC_URL_SHOPPING_LIST: z.string()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success)
    throw new InvalidEnvError(JSON.stringify(_env.error.format()));

export const env = _env.data;