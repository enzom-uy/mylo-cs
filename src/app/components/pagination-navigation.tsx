import { ArrowLeft, ArrowRight } from 'lucide-react'

interface PaginationNavigationProps {
    prevPage: number | null
    nextPage: number | null
    currentPage: number
    goToPage: (page: number) => void
}

export default function PaginationNavigation({
    prevPage,
    currentPage,
    nextPage,
    goToPage
}: PaginationNavigationProps) {
    console.log(!!nextPage)
    return (
        <div className="flex w-full items-center justify-center gap-2 pt-4">
            <button
                onClick={() => goToPage(prevPage as number)}
                disabled={!prevPage && true}
            >
                <ArrowLeft
                    className={`${!!!prevPage && 'text-muted-foreground/50'}`}
                />
            </button>
            <span>{currentPage}</span>
            <button
                onClick={() => goToPage(nextPage as number)}
                disabled={!nextPage && true}
            >
                <ArrowRight
                    className={`${!!!nextPage && 'text-muted-foreground/50'}`}
                />
            </button>
        </div>
    )
}
