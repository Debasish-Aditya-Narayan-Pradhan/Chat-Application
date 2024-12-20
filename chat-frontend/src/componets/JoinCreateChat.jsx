import React, { useState } from 'react'
import chatIcon from "../assets/speak.png"
import toast from 'react-hot-toast';
import { checkRoomExist, createRoom, joinChatApi } from '../services/RoomService';
import useChatContext from '../context/context.jsx';
import { useNavigate } from 'react-router';
function JoinCreateChat() {
  const[detail,setDetail] = useState({
    roomId:"",
    userName:""
  });

  const {roomId,userName,connected,setConnected,setRoomId,setUserName} =  useChatContext()
  const navigte = useNavigate()
  function handleFormInputChange(event)
  {
    setDetail(
      {
        ...detail,
        [event.target.name]: event.target.value
      }
    );
  }
  function validateForm()
  {
    if(detail.roomId === "" || detail.userName === "")
    {
      toast.error("Invalid Input !!")
      return false;
    }

    return true;
  }
  async function joinChat()
  {
    if(validateForm())
    {
      
      try{
        const room = await joinChatApi(detail.roomId);
      toast.success("joined...");
      setUserName(detail.userName)
      setRoomId(room.roomId)
      setConnected(true)
      navigte("/chat")
      }catch(error)
      {
        if(error.status == 400)
        {
          toast.error(error.response.data)
        }
        else
        {
          toast.error("Error in joining room")
          console.log(error);
        }
        
        
      }
    }
  }
  async function isRoomExist(roomId) {
    try {
      const res = await checkRoomExist(roomId); // Call to check if the room exists
      console.log(typeof(res.data));
      if(res.data === 0)
      {
        return false;
      }

      return true;
  } catch (error) {
     return true;
  }
  }
  async function createChat()
  {
      if(validateForm())
      {
        const check = await isRoomExist(detail.roomId)
        if(check)
          {
            toast.error("Room is already exist !!");
            return;
          }
      }
   
    if(validateForm())
    {
      try{
        const response = await createRoom(detail.roomId)
        console.log(response);
        toast.success("room created successfylly !!")
        
        joinChat();
        
      }catch(error)
      {
        console.log(error);
        toast.error("Error in creating room")
      }
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col border p-8 w-full dark:border-gray-700 max-w-md rounded dark:bg-gray-900 shadow gap-4'>
        <div className='text-center'>
            <img className="w-24 mx-auto" src={chatIcon} alt=''/>
        </div>
        <h1 className='text-2xl font-semibold text-center'>Join Room / Create Room ..</h1>
        <div className=''>
            <label htmlFor='name' className='block font-medium mb-2'>
                Your Name
            </label>
            <input type='text' id='name'
            onChange={handleFormInputChange}
            value={detail.name} 
            name='userName'
            placeholder='Enter the name'
            className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>
        <div className=''>
            <label htmlFor='name' className='block font-medium mb-2'>
                Romm ID/New Room ID
            </label>
            <input type='text' 
            name='roomId'
            onChange={handleFormInputChange}
            value={detail.roomId}
            placeholder='Enter your roomId'
            id='name' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>

        <div className='flex items-center justify-center gap-4'>
            <button onClick={joinChat} className='px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded mt-4'>
                Join Room
            </button>
            <button onClick={createChat} className='px-3 py-2 hover:dark:bg-orange-800 dark:bg-orange-500 rounded mt-4'>
                Create Room
            </button>
        </div>
      </div>
    </div>
  )
}

export default JoinCreateChat
