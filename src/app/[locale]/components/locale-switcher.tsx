'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/shad-components/dropdown-menu'
import { Languages } from 'lucide-react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next-intl/client'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export type AvailableLocales = 'es' | 'en'

export default function LocaleSwitcher() {
    const locale = useLocale() as AvailableLocales
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const pathname = usePathname()
    console.log(locale)

    const onValueChange = (locale: AvailableLocales) => {
        startTransition(() => {
            router.replace(`/${locale}${pathname}`)
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-border-dark p-1 text-xs font-bold text-accent-light">
                <Languages className="w-5" />
                {locale === 'es' ? 'ES' : 'EN'}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-3 bg-transparent">
                <DropdownMenuItem onClick={() => onValueChange('es')}>
                    Español
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onValueChange('en')}>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
