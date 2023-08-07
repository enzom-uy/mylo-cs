import { AspectRatio } from '@/shad-components/aspect-ratio'
import { Badge } from '@/shad-components/badge'
import { Separator } from '@/shad-components/separator'
import { Skeleton } from '@/shad-components/skeleton'

export default function LoadingPage() {
    return (
        <div className="flex w-full flex-col items-center gap-4 rounded-md">
            <div className="flex w-full flex-col flex-wrap items-center gap-1 sm:flex-row sm:items-start sm:gap-4">
                <div className="flex max-w-full flex-wrap items-start justify-center sm:justify-start">
                    <div>
                        <Skeleton className="h-[100px] w-[100px] rounded-sm" />
                    </div>
                </div>
                <div className="flex flex-col items-center overflow-hidden md:items-start">
                    <Skeleton className="mb-1 h-[20px] w-[10ch]" />

                    <div className="flex items-center gap-2">
                        <Badge>
                            <Skeleton className="h-3 w-6" />
                        </Badge>
                        <Badge>
                            <Skeleton className="h-3 w-6" />
                        </Badge>
                    </div>
                </div>

                <Separator />

                <section className="min-h-fit">
                    <div className="flex flex-wrap justify-start gap-4">
                        <div className="flex max-w-md flex-1 flex-col gap-2">
                            <Skeleton className="h-5 w-40" />
                            <AspectRatio ratio={16 / 12} className="rounded-sm">
                                <Skeleton className="h-full w-full" />
                            </AspectRatio>
                        </div>

                        <div className="transparent-card max-h-full w-fit flex-1 gap-3 overflow-hidden border-none">
                            <div className="flex w-full items-center justify-between">
                                <Skeleton className="h-5 w-20" />
                                <Skeleton className="h-6 w-6" />
                            </div>
                            <div className="flex w-full flex-col gap-1">
                                <Skeleton className="h-9 w-full rounded-sm" />
                                <Skeleton className="h-9 w-full rounded-sm" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
