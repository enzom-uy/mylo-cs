import axios from 'axios'
import { NewServerData, ServerApiResponse } from './route'
import { errorMessage, successMessage } from './utils'

axios.defaults.baseURL = 'http://localhost:3000/'

const serverName = 'Jest Test Server Name'
const serverId = '123456789012345'

const apiUrls = {
    create: 'api/create-server',
    delete: 'api/delete-server'
}

// Utils
const axiosCreateNewServer = async ({
    serverName,
    serverId
}: NewServerData) => {
    const response = await axios
        .post(apiUrls.create, {
            serverName,
            serverId
        })
        .then((res) => res.data)
    return response
}

const deleteTestServer = async () => {
    await axios
        .post(apiUrls.delete, {
            serverName,
            serverId
        })
        .then((res) => res.data)
}

// Tests

describe('server-related endpoints', () => {
    beforeAll(async () => {
        return await deleteTestServer()
    })

    afterAll(async () => {
        return await deleteTestServer()
    })

    test('should be successful if all the data passed to create-server endpoint is correct', async () => {
        expect(
            await axiosCreateNewServer({ serverName, serverId })
        ).toStrictEqual<ServerApiResponse>({
            status: 201,
            message: successMessage,
            result: 'success'
        })
    })

    test('should return an error because serverName doesnt meet the min requirements (length 4)', async () => {
        expect(
            await axiosCreateNewServer({
                serverName: 'Syl',
                serverId
            })
        ).toStrictEqual<ServerApiResponse>({
            status: 403,
            message: errorMessage,
            result: 'error'
        })
    })

    test('should return an error because serverId doesnt meet the min requirements (length 15)', async () => {
        expect(
            await axiosCreateNewServer({
                serverName: 'Sylphrena',
                serverId: '12345678901234'
            })
        ).toStrictEqual<ServerApiResponse>({
            status: 403,
            message: errorMessage,
            result: 'error'
        })
    })
})
