import axios from 'axios'

export type Guild = {
    id: string
    name: string
    icon: string
    owner: boolean
    permissions: number
    permissions_new: string
    features: string[]
}

interface GetUserGuildsProps {
    access_token: string
}

export const getUserGuilds = async ({ access_token }: GetUserGuildsProps) => {
    const userGuilds = await axios
        .get('https://discordapp.com/api/users/@me/guilds', {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        })
        .then((res) => {
            const guilds = res.data as Guild[]
            return guilds.filter((guild) => guild.owner === true)
        })
    return userGuilds
}
