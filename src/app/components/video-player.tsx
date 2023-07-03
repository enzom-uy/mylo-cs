import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

export default function VideoPlayer({ url }: { url: string }) {
    return (
        <>
            <Plyr
                style={{ padding: '0' }}
                source={{
                    type: 'video',
                    sources: [
                        {
                            src: url,
                            provider: 'html5'
                        }
                    ]
                }}
                muted
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
