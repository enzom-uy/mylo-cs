import 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: User
        id: string
    }

    interface Token {
        id: string
    }
}
