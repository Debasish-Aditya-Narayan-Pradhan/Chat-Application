import { httpClient } from "./AxiosHelper"

export const createRoom = async(roomDetails) =>
{
    const response = await httpClient.post('/api/v1/rooms/create',roomDetails)
    return response.data
}

export const checkRoomExist = async(roomDetails) =>
    {
        const response = await httpClient.get(`/api/v1/rooms/${roomDetails}`)
        return response;
    }

export const joinChatApi=async (roomId) =>
{
    const res = await httpClient.get(`/api/v1/rooms/join/${roomId}`)
    return res.data;
}

export const getMessages = async(roomId) =>
{
    const response = await httpClient.get(`/api/v1/rooms/${roomId}/messages`);
    return response.data

}