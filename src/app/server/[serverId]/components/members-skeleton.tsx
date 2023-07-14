import { Skeleton } from '@/shad-components/skeleton'

const MemberSkeleton = () => {
    return (
        <div className="flex items-center gap-2 py-2">
            <Skeleton className="h-10 w-11" />
            <Skeleton className="h-10 w-full" />
        </div>
    )
}
export default function MembersSkeleton() {
    return (
        <div className="my-2 flex flex-col">
            <MemberSkeleton />
            <MemberSkeleton />
        </div>
    )
}
