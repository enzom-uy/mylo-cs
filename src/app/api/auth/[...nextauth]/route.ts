import NextAuth from 'next-auth/next'
import DiscordProvider from 'next-auth/providers/discord'

const handler = NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
        })
    ]
})

export { handler as GET, handler as POST }
