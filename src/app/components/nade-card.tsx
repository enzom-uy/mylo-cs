'use client'

import VideoPlayer from './video-player'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Badge } from '@shad/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@shad/card'
import { NadeWithAuthorAndMap } from './sections/nades-section'
import { NadeAuthorNadeType } from '@/services/getServer'
import { uppercaseFirstLetter } from '@/utils/uppercaseFirstLetter'

import 'plyr-react/plyr.css'

interface Props {
    nade: NadeWithAuthorAndMap | NadeAuthorNadeType
}

const NadeCard: React.FC<Props> = ({ nade }) => {
    const author = nade.author.name
    const title = uppercaseFirstLetter(nade.title)
    return (
        <Card className="w-full max-w-lg border-border-dark bg-dark">
            <CardHeader>
                <CardTitle className="m-0 text-light">{title}</CardTitle>
                <div className="flex flex-wrap items-center gap-2 text-light-muted">
                    <Badge>{nade.nade_type_name}</Badge>
                    <Badge>{nade.map_name}</Badge>
                    <Badge>
                        <p className="max-w-[9ch] overflow-hidden text-ellipsis whitespace-nowrap ">
                            {author}
                        </p>
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="text-light">
                <div className="flex max-w-md justify-center rounded-[0.25rem]">
                    <AspectRatio ratio={16 / 12} className="overflow-hidden">
                        <VideoPlayer url={nade.video_url} />
                    </AspectRatio>
                </div>
            </CardContent>
        </Card>
    )
}

export default NadeCard
