'use client'

import { NadeAuthorNadeType } from '@/services/getServer'
import { uppercaseFirstLetter } from '@/utils/uppercaseFirstLetter'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Badge } from '@shad/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@shad/card'
import { NadeWithAuthorAndMap } from './sections/nades-section'
import VideoPlayer from './video-player'
import AdminControlsDropdown from '../server/[serverId]/admin/components/admin-controls-dropdown'

interface Props {
    nade: NadeWithAuthorAndMap | NadeAuthorNadeType
    isAdmin?: boolean
    showStatus?: boolean
}

const NadeCard: React.FC<Props> = ({ nade, isAdmin, showStatus }) => {
    const { nade_type_name, map_name, status, video_url } = nade
    const author = nade.author.name
    const title = uppercaseFirstLetter(nade.title)
    const isPending = status === 'PENDING'

    return (
        <Card
            className={`w-full max-w-lg border-border-dark bg-dark md:max-w-md`}
        >
            <CardHeader>
                <div className="flex items-center">
                    <CardTitle className="m-0 text-light">{title}</CardTitle>
                    {isAdmin && (
                        <AdminControlsDropdown
                            isPending={isPending}
                            nade={nade as NadeAuthorNadeType}
                        />
                    )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Badge className="text-muted-foreground">
                        {nade_type_name}
                    </Badge>
                    <Badge className="text-muted-foreground">{map_name}</Badge>
                    <Badge className="text-muted-foreground">
                        <p className="max-w-[9ch] overflow-hidden text-ellipsis whitespace-nowrap ">
                            {author}
                        </p>
                    </Badge>
                    {showStatus && (
                        <Badge>
                            <p
                                className={`${
                                    status === 'PENDING'
                                        ? 'text-yellow-500'
                                        : 'text-green-500'
                                }`}
                            >
                                {status}
                            </p>
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="text-light">
                <AspectRatio
                    ratio={16 / 9}
                    className="relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 aspect-video w-full rounded-[0.25rem] bg-black">
                        <VideoPlayer url={video_url} />
                    </div>
                </AspectRatio>
            </CardContent>
        </Card>
    )
}

export default NadeCard
