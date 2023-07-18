import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/shad-components/sheet'
import { Settings } from 'lucide-react'
import ServerConfigDelete from './server-config-delete'

interface Props {
    serverId: string
    ownerId: string
    userId: string
}

export default function ServerConfig({ serverId, ownerId, userId }: Props) {
    return (
        <Sheet>
            <SheetTrigger>
                <Settings className="text-muted-foreground" />
            </SheetTrigger>
            <SheetContent className="bg-dark">
                <SheetHeader>
                    <SheetTitle className="m-0 text-light">
                        Configuración
                    </SheetTitle>
                    <SheetDescription className="text-muted-foreground">
                        Ajusta la configuración de tu servidor.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                    <ServerConfigDelete serverId={serverId} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
