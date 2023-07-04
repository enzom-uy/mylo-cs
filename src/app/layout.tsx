import Header from '@/components/header'
import Main from '@/components/main'
import { Inter } from 'next/font/google'
import Provider from './components/provider'
import './globals.css'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Mylo',
    description:
        'Crea y administra las nades de csgo en tus servidores de discord.',
    icons: {
        icon: '/src/app/favicon.ico'
    }
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className="bg-dark">
            <body
                className={`${inter.className} mb-14 flex flex-col items-center text-light`}
            >
                <Provider>
                    <Header />
                    <Main>{children}</Main>
                </Provider>
            </body>
        </html>
    )
}
