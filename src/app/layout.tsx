import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Main from '@/components/main'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="bg-dark">
            <body className={`${inter.className} text-light`}>
                <Header />
                <Main>{children}</Main>
            </body>
        </html>
    )
}
