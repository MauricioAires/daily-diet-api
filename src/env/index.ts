import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string(),
  SECRET_TOKEN: z.string(),
  EXPIRES_TOKEN: z.string(),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  PORT: z.coerce.number().default(3333),
  BYCRYPT_HASH_SALT: z.coerce.number(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.info(`Invalid environment variable: ${_env.error.format()}`)

  throw new Error(`Invalid environment variable`)
}

export const env = _env.data
