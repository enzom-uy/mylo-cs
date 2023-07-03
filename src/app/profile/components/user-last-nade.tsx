'use client'

import VideoPlayer from '@/app/components/video-player'
import { AspectRatio } from '@/shad-components/aspect-ratio'

export default function UserLastNade({ url }: { url: string }) {
    return (
        <div className="transparent-card flex w-full max-w-xs border-none">
            <span className="text-sm font-bold uppercase">
                última granada subida
            </span>

            <AspectRatio ratio={16 / 12} className="rounded-sm">
                <VideoPlayer url={url} />
            </AspectRatio>
        </div>
    )
}
