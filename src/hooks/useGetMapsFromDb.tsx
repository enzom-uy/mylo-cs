import { Map } from '@prisma/client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useGetMapsFromDb = () => {
    const [maps, setMaps] = useState<Map[] | undefined>()

    useEffect(() => {
        const fetchMaps = async () => {
            const maps = await axios
                .get('/api/get-maps')
                .then((res) => res.data)
            setMaps(maps)
        }
        fetchMaps()
    }, [])
    return { maps }
}
