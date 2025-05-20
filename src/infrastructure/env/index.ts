import { InvalidEnvError } from "@src/domain/errors/invalid-env";
import { z } from "zod";

const envSchema = z.object({
    URL_AUTH: z.string()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success)
    throw new InvalidEnvError(JSON.stringify(_env.error.format()));

export const env = _env.data;