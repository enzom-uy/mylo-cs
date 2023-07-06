import NadeCard from '@/app/components/nade-card'
import { NadeAuthorNadeType } from '@/services/getServer'

interface Props {
    nades: NadeAuthorNadeType[]
}

export default function ServerNades({ nades }: Props) {
    return (
        <div className="flex w-full max-w-sm flex-col justify-center">
            <h2 className="text-lg font-semibold uppercase">granadas</h2>
            {nades.map((nade) => (
                <NadeCard nade={nade} key={nade.id} />
            ))}
        </div>
    )
}
