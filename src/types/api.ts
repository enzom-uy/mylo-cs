export interface ApiResponse {
    status: '200' | '201' | '403' | '404'
    message: string
    result: 'error' | 'success'
}
