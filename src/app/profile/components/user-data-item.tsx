export const DataItem = ({
    title,
    content
}: {
    title: string
    content: string
}) => {
    return (
        <div className="flex max-w-[200px] items-center gap-1 sm:max-w-[300px]">
            <p className="text-sm font-bold uppercase">{title}</p>
            <span className="truncate">{content}</span>
        </div>
    )
}
