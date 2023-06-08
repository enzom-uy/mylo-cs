import { Nade } from '@/types/db'
import { Badge } from '@shad/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@shad/card'

import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

interface Props {
    nade: Nade
}

const NadeCard: React.FC<Props> = ({ nade }) => {
    const author = nade.authorId.split('#')[0]
    return (
        <Card className="border-border-dark bg-dark">
            <CardHeader>
                <CardTitle className="text-light">{nade.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-light-muted">
                    <Badge>{nade.nadeTypeName}</Badge>
                    <Badge>{nade.mapId}</Badge>
                    <Badge>{author}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="text-light">
                <div className="overflow-hidden rounded-[0.25rem]">
                    <Plyr
                        source={{
                            type: 'video',
                            sources: [
                                {
                                    src: nade.videoUrl,
                                    provider: 'html5'
                                }
                            ]
                        }}
                        muted
                        options={{
                            controls: ['play', 'progress', 'settings', 'volume']
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default NadeCard
