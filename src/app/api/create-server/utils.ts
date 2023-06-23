import axios from 'axios'
import { NewServerData } from './route'

export const errorMessage =
    'Ha ocurrido un error al intentar crear el servidor. Inténtalo nuevamente.'
export const successMessage = 'Se ha creado el servidor exitosamente.'

export const serverNameMinLength = 4
export const serverIdMinLength = 15

export const apiUrls = {
    create: 'api/create-server',
    delete: 'api/delete-server'
}

export const axiosCreateNewServer = async ({
    serverName,
    serverId,
    ownerId,
    serverDescription
}: NewServerData) => {
    const postServerBody: NewServerData = {
        serverName,
        serverId,
        ownerId,
        serverDescription
    }
    const response = await axios
        .post(apiUrls.create, postServerBody)
        .then((res) => res.data)
        .catch((e) => console.log(e))
    return response
}
