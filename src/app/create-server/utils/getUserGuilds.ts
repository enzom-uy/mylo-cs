import axios from 'axios'
import axiosRetry from 'axios-retry'

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
    try {
        axiosRetry(axios, { retries: 5 })
        axiosRetry(axios, {
            retryDelay: (retryCount) => {
                return retryCount * 1200
            }
        })
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
    } catch (error) {
        console.error(error)
    }
}
