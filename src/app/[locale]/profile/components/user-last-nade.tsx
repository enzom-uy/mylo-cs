'use client'

import VideoPlayer from '@/app/[locale]/components/video-player'
import { AspectRatio } from '@/shad-components/aspect-ratio'
import { useTranslations } from 'next-intl'

export default function UserLastNade({ url }: { url: string }) {
    const t = useTranslations()
    return (
        <div className="transparent-card flex w-full max-w-md flex-1 border-none">
            <span className="text-sm font-bold uppercase">
                {t('User-Profile.last-nade')}
            </span>

            {url ? (
                <AspectRatio ratio={16 / 12} className="rounded-sm">
                    <VideoPlayer url={url} />
                </AspectRatio>
            ) : (
                <p className="font-semibold text-muted-foreground">
                    {t('User-Profile.no-last-nade')}
                </p>
            )}
        </div>
    )
}
