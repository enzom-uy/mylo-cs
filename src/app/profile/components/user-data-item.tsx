export const DataItem = ({
    title,
    content
}: {
    title: string
    content: string
}) => {
    return (
        <div className="flex items-center gap-1">
            <p className="text-sm font-bold uppercase">{title}</p>
            <span>{content}</span>
        </div>
    )
}
