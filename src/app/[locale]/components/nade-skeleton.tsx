import { AspectRatio } from '@/shad-components/aspect-ratio'
import { Card, CardContent, CardHeader } from '@/shad-components/card'
import { Skeleton } from '@/shad-components/skeleton'

export default function NadeSkeleton() {
    return (
        <Card
            className={`w-full max-w-lg border-border-dark bg-dark md:max-w-md`}
        >
            <CardHeader>
                <div className="flex items-center">
                    <div className="m-0 text-light">
                        <Skeleton className="h-[1ch] w-[10ch]" />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="text-muted-foreground">
                        <Skeleton className="h-[1ch] w-[5ch]" />
                    </div>
                    <div className="text-muted-foreground">
                        <Skeleton className="h-[1ch] w-[5ch]" />
                    </div>
                    <div className="text-muted-foreground">
                        <div className="max-w-[9ch] overflow-hidden text-ellipsis whitespace-nowrap ">
                            <Skeleton className="h-[1ch] w-[5ch]" />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="text-light">
                <AspectRatio
                    ratio={16 / 9}
                    className="relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 aspect-video w-full rounded-[0.25rem] bg-black">
                        <Skeleton className="h-full w-full" />
                    </div>
                </AspectRatio>
            </CardContent>
        </Card>
    )
}
