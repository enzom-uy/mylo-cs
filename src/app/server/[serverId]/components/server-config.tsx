import { DeleteServerReqBody } from '@/app/api/delete-server/route'
import { Button } from '@/shad-components/button'
import { Label } from '@/shad-components/label'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/shad-components/sheet'
import { useToast } from '@/shad-components/use-toast'
import { ApiResponse } from '@/types/api'
import axios, { AxiosResponse } from 'axios'
import { Settings } from 'lucide-react'
import ServerConfigDelete from './server-config-delete'

interface Props {
    serverId: string
}

export default function ServerConfig({ serverId }: Props) {
    return (
        <Sheet>
            <SheetTrigger>
                <Settings className="text-muted-foreground" />
            </SheetTrigger>
            <SheetContent>
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
