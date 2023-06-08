import type { Config } from 'drizzle-kit'

export default {
    schema: './src/schema/*',
    out: './drizzle',
    connectionString:
        'mysql://6v23uoz8zgvwaf4m0ht1:pscale_pw_U2pW3DPl9yQW65Gf6R4ncb9Howb8IP2ZSGVFJEnv5mu@aws.connect.psdb.cloud/mylonades_bot?ssl={"rejectUnauthorized":true}'
} satisfies Config
