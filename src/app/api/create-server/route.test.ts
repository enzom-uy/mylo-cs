import axios from 'axios'
import { ServerApiResponse } from './route'
import {
    apiUrls,
    axiosCreateNewServer,
    errorMessage,
    successMessage
} from './utils'

axios.defaults.baseURL = 'http://localhost:3000/'

const serverName = 'Jest Test Server Name'
const serverId = '123456789012345'
const ownerId = 'clj652wiq000agia32hbqghe3'

// Utils
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
            await axiosCreateNewServer({
                serverName,
                serverId,
                ownerId,
                serverDescription: null
            })
        ).toStrictEqual<ServerApiResponse>({
            status: 201,
            message: successMessage,
            result: 'success',
            serverId
        })
    })

    test('should return an error because serverName doesnt meet the min requirements (length 4)', async () => {
        expect(
            await axiosCreateNewServer({
                serverName: 'Syl',
                serverId,
                ownerId,
                serverDescription: null
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
                serverId: '12345678901234',
                ownerId,
                serverDescription: null
            })
        ).toStrictEqual<ServerApiResponse>({
            status: 403,
            message: errorMessage,
            result: 'error'
        })
    })
})
