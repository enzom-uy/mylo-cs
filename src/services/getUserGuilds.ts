import axios from 'axios'
import axiosRetry from 'axios-retry'
import { cache } from 'react'

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

/**
 * Gets all discord servers the user is in. Returns undefined on fail.
 * @param {string} params.access_token - Access token returned by the Discord Auth Provider.
 * @returns {Promise<Guild[] | undefined>}
 */
export const getUserGuilds = cache(
    async ({
        access_token
    }: GetUserGuildsProps): Promise<Guild[] | undefined> => {
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
)
