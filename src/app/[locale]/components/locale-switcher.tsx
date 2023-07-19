'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
            <DropdownMenuTrigger className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <Languages className="w-5" />
                {locale === 'es' ? 'ES' : 'EN'}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onValueChange('es')}>
                    Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onValueChange('en')}>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
