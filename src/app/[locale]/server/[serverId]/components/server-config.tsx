import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/shad-components/sheet'
import { Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import ServerConfigDelete from './server-config-delete'

interface Props {
    serverId: string
    ownerId: string
    userId: string
}

export default function ServerConfig({ serverId, ownerId, userId }: Props) {
    const t = useTranslations()
    return (
        <Sheet>
            <SheetTrigger>
                <Settings className="text-muted-foreground" />
            </SheetTrigger>
            <SheetContent className="">
                <SheetHeader>
                    <SheetTitle className="m-0 text-light">
                        {t('Server.server-config.title')}
                    </SheetTitle>
                    <SheetDescription className="text-muted-foreground">
                        {t('Server.server-config.description')}
                    </SheetDescription>
                </SheetHeader>
                {ownerId === userId && (
                    <div className="mt-4">
                        <ServerConfigDelete serverId={serverId} />
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
