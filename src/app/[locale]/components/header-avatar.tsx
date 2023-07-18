'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

interface Props {
    image: string | undefined
    fallback: string
}

const HeaderAvatar: React.FC<Props> = ({ image, fallback }) => {
    return (
        <Avatar>
            <AvatarImage
                width="100%"
                height="100%"
                src={image}
                className="rounded-full"
                alt="User discord profile picture"
            />
            <AvatarFallback className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-dark-secondary">
                {fallback}
            </AvatarFallback>
        </Avatar>
    )
}

export default HeaderAvatar
