import { Separator } from '@/shad-components/separator'
import { Skeleton } from '@/shad-components/skeleton'

export default function LoadingServerPage() {
    return (
        <div className="flex w-full flex-col lg:max-w-[83.3rem] lg:flex-row">
            <div className="mb-4 flex w-full flex-col items-center gap-4  border-b border-border-dark pb-4 md:items-start md:justify-start lg:mr-4 lg:w-fit lg:max-w-xs lg:flex-col lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
                <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-start">
                    <Skeleton className="h-[100px] w-[150px]" />
                    <div className="flex w-full flex-col items-center gap-2 md:items-start">
                        <div className="flex w-full items-center justify-center gap-8 md:justify-between lg:gap-2">
                            <div className="m-0 w-fit max-w-[30ch] text-center md:text-start">
                                <Skeleton className="h-8 w-40" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-10 w-full max-w-sm" />
            </div>
        </div>
    )
}
