'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader
} from '@/shad-components/card'
import { Skeleton } from '@/shad-components/skeleton'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'

const NadeCardSkeleton = () => {
    return (
        <Card className="w-full border-border-dark bg-dark">
            <CardHeader>
                <Skeleton className="h-3 w-[20ch]" />

                <CardDescription className="flex items-center gap-2">
                    <Skeleton className="h-3 w-11 rounded-lg" />
                    <Skeleton className="h-3 w-11 rounded-lg" />
                    <Skeleton className="h-3 w-11 rounded-lg" />
                </CardDescription>
            </CardHeader>
            <CardContent className="text-light">
                <div className="overflow-hidden rounded-[0.25rem]">
                    <AspectRatio ratio={16 / 9}>
                        <Skeleton className="h-full w-full" />
                    </AspectRatio>
                </div>
            </CardContent>
        </Card>
    )
}

export default NadeCardSkeleton
