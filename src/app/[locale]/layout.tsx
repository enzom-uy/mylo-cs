import Header from '@/app/[locale]/components/header'
import Main from '@/app/[locale]/components/main'
import '@/app/globals.css'
import { Metadata } from 'next'
import { NextIntlClientProvider, createTranslator, useLocale } from 'next-intl'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import React from 'react'
import Provider from './components/provider'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({
    params: { locale }
}: {
    params: { locale: string }
}) {
    const messages = (await import(`../messages/${locale}.json`)).default

    const t = createTranslator({ locale, messages })

    return {
        title: 'Mylo',
        description: t('Metadata.description'),
        icons: {
            icon: '/src/app/favicon.ico'
        }
    }
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    const locale = useLocale()
    let messages
    try {
        messages = (await import(`../messages/${locale}.json`)).default
    } catch (error) {
        notFound()
    }

    if (params.locale !== locale) {
        notFound()
    }

    return (
        <html lang="en" className="bg-dark">
            <body
                className={`${inter.className} mb-14 flex flex-col items-center text-light`}
            >
                <Provider>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <Header />
                        <Main>{children}</Main>
                    </NextIntlClientProvider>
                </Provider>
            </body>
        </html>
    )
}