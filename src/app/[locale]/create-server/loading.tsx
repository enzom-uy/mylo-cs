import { Skeleton } from '@/shad-components/skeleton'

export default function LoadingCreateServer() {
    return (
        <div className="flex w-full flex-col items-center gap-4">
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-11 w-full" />
        </div>
    )
}
