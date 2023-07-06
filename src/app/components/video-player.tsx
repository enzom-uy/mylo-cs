import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

export default function VideoPlayer({ url }: { url: string }) {
    return (
        <>
            <Plyr
                source={{
                    type: 'video',
                    sources: [
                        {
                            src: url,
                            provider: 'html5'
                        }
                    ]
                }}
                muted={true}
                options={{
                    controls: [
                        'play',
                        'progress',
                        'settings',
                        'volume',
                        'fullscreen'
                    ]
                }}
            />
        </>
    )
}
