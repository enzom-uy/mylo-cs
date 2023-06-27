import { createContext, useState } from 'react'
import { Guild } from '../utils/getUserGuilds'

interface CreateServerContext {
    selectedGuild: Guild | undefined
    handleUserSelectGuild?: ({ guild }: { guild: Guild }) => void
    handleResetGuild?: () => void
}

export const CreateServerContext = createContext<CreateServerContext>({
    selectedGuild: undefined
})

export const CreateServerContextProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [guild, setGuild] = useState<Guild | undefined>(undefined)

    const handleUserSelectGuild = ({ guild }: { guild: Guild }) => {
        if (guild) setGuild(guild)
        return
    }

    const handleResetGuild = () => {
        return setGuild(undefined)
    }

    const contextValue: CreateServerContext = {
        selectedGuild: guild,
        handleUserSelectGuild,
        handleResetGuild
    }
    return (
        <CreateServerContext.Provider value={contextValue}>
            {children}
        </CreateServerContext.Provider>
    )
}
