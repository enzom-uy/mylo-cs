'use client'
import { Button } from '@/shad-components/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/shad-components/tooltip'
import { useToast } from '@/shad-components/use-toast'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Session } from 'next-auth'
import { useState } from 'react'
import { LuCopy, LuCopyCheck } from 'react-icons/lu'

export default function Identifier({ session }: { session: Session | null }) {
    const [copied, setCopied] = useState<boolean>(false)
    const { toast } = useToast()
    const id = session?.user?.id as string
    const hiddenId = id.replace(/./g, '*')
    const copyId = () => {
        setCopied(true)
        toast({
            title: 'Copiado al portapapeles.',
            duration: 2000
        })
        return navigator.clipboard.writeText(id)
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <div className="flex w-full items-center gap-1">
                    <span className="text-sm font-bold uppercase">
                        identificador:
                    </span>
                    <div className="flex h-min w-full select-none items-center justify-between rounded-md">
                        <TooltipTrigger asChild>
                            <p
                                className="cursor-pointer select-none overflow-hidden blur-[2px]"
                                onClick={() => copyId()}
                            >
                                {hiddenId}
                            </p>
                        </TooltipTrigger>

                        <Button
                            onClick={() => copyId()}
                            variant="secondary"
                            className="flex w-min items-center gap-2 bg-dark p-3 text-sm text-light hover:bg-border-dark"
                        >
                            {copied ? (
                                <LuCopyCheck className="text-lg" />
                            ) : (
                                <LuCopy className="text-lg" />
                            )}
                        </Button>
                    </div>
                </div>
                <TooltipContent className="text-sm">
                    Clic para copiar
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
