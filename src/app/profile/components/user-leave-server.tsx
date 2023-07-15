'use client'

import { LeaveServerReqBody } from '@/app/api/leave-server/route'
import { Button } from '@/shad-components/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shad-components/dialog'
import { useToast } from '@/shad-components/use-toast'
import { Server } from '@prisma/client'
import axios from 'axios'
import { Ban } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserLeaveServer({
    userId,
    server
}: {
    userId: string
    server: Server
}) {
    const [open, setOpen] = useState<boolean>()
    const router = useRouter()
    const { toast } = useToast()
    const handleConfirm = async () => {
        const axiosBody: LeaveServerReqBody = {
            serverId: server.id,
            userId
        }
        const response = await axios
            .post('/api/leave-server', axiosBody)
            .then((res) => res.data)
        toast({ title: response.message })
        setTimeout(() => {
            router.refresh()
        }, 500)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Ban className="w-5 text-muted-foreground duration-200 hover:text-destructive" />
            </DialogTrigger>
            <DialogContent className="flex justify-center">
                <DialogHeader className="w-fit">
                    <DialogTitle className="w-fit">
                        ¿Dejar el servidor {server.name}
                    </DialogTitle>
                    <Button
                        onClick={handleConfirm}
                        className="btn w-full max-w-xs bg-destructive hover:bg-destructive/90"
                    >
                        Confirmar
                    </Button>
                    <Button
                        className="btn w-full max-w-xs bg-dark/80 hover:bg-dark/90"
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
