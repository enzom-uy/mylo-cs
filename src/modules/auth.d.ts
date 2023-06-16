import 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string | number
    }

    interface Session {
        user: User
    }
}
