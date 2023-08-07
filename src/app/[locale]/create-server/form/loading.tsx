import { Skeleton } from '@/shad-components/skeleton'

export default function LoadingForm() {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-10 w-full" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-20 w-full" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>

            <div className="flex flex-col gap-1">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
            <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-sm" />
                <Skeleton className="h-5 w-40" />
            </div>
            <Skeleton className="h-10 w-20" />
        </div>
    )
}
