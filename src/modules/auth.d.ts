import 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: User
        id: string
        access_token: string
    }

    interface Token {
        id: string
    }

    interface User {}
}
