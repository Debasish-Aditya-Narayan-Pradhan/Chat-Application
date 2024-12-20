import React, { useEffect, useRef } from 'react'
import {MdAttachFile,MdSend} from "react-icons/md"
import { useState } from 'react'
import useChatContext from '../context/context';
import { useNavigate } from 'react-router';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { baseUrl } from '../services/AxiosHelper';
import { getMessages } from '../services/RoomService';
import toast from 'react-hot-toast';
function ChatPage() {
  const navigate = useNavigate()
  const{roomId,userName,connected,setConnected, setRoomId, setUserName} = useChatContext()
  
  useEffect(() =>{
    if(!connected)
    {
      navigate("/")
    }
  },[connected,roomId,userName])
  const[val,setVal] = new useState(0);
    const[messages,setMessages] = useState([]);
    const[input,setInput] = useState("");
    const inputRef = useRef(null);
    const chatBoxRef = useRef(null);
    const [stompClient,setStompClient] = useState(null);

   

    //page init:
    //messages ko load karne honge

    useEffect(()=>
    {
     
      async function loadMessages() {
        console.log("Hello");
      
        try{
          const messages = await getMessages(roomId);
          console.log("Hello: "+messages);
          setMessages(messages)
        }catch(error)
        {
          console.log(error);
          
        }
      }

      if(connected)
      {
        loadMessages();
      }
    }
    ,[])

  

    //stompClient ko init karne honge
      //subscribe

      useEffect(() =>
      {
        
        
        const connectWebSocket=()=>
        {
          //SockJs
          
          const sock = () => new SockJS(`${baseUrl}/chat`)
          const client = Stomp.over(sock)
          
          client.debug = (msg) => console.log("STOMP Debug:", msg);
          client.connect({
          },()=>
          {
            
            setStompClient(client);

        toast.success("connected");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);

          const newMessage = JSON.parse(message.body);
          console.log("connected.....");
          setMessages((prev) => [...prev, newMessage]);
          })

        },
        (error) => {
          console.error("Connection error:", error);
          toast.error("Connection to server failed.");
        });
          
        }
        if(connected)
        {
          connectWebSocket();
        }
        //stompclient
      },[roomId])

      const sendMessage = async ()=>
      {
        if(stompClient && connected && input.trim())
        {
          console.log(input);

          const message ={
            sender:userName,
            content:input,
            roomId:roomId
          }

          stompClient.send(`/app/sendMessage/${roomId}`,
            {},
            JSON.stringify(message));
            setVal((prev) => prev+1);
            setInput("");
        }
      }


  return (
    <div className=''>
        {/* this is a header */}
      <header className="dark:bg-gray-900 shadow  py-5 items-center h-12 flex justify-around fixed w-full">
        <div >
            <h1 className='text-xl font-semibold'>Room : <span>{roomId}</span></h1>
        </div>
        
        <div>
        <h1 className='text-xl font-semibold'>User : <span>{userName}</span></h1>
        </div>
        <div>
            <button className='dark:bg-red-500 dark:hover:bg-red-700 rounded p-2'>Leave Room</button>
        </div>
      </header>
      {/* Content of chat */}
      <main className='py-20 px-10 boarder w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto'>
        {
            messages.map((message,index) =>
            {
                return <div key={index} className={`flex ${message.sender===userName ? 'justify-end' : 'justify-start'}`}>
                    <div  className={`my-2 ${message.sender === userName ?  'bg-green-700 ' :'bg-blue-700'} p-2 rounded max-w-xs`}>
                   <div className='flex flex-row gap-2'>
                    <img className="h-10 w-10" src='https://avatar.iran.liara.run/public/32' alt=''/>
                   <div>
                        <p className='text-sm font-bold'>{message.sender}</p>
                        <p>{message.content}</p>
                    </div>
                   </div>
                </div>
                </div>
            })
        }
      </main>
      {/* input message container  */}
      <div className='bottom-2 w-full h-16 '>
        <div className='h-full rounded-full w-2/3 mx-auto dark:bg-gray-900 flex items-center justify-center '>
           <input 
           value={input}
           onChange={(e) => {setInput(e.target.value)}}
           type='text' 
           placeholder='Type your message here...' className='dark:border-gray-700 dark:bg-gray-900 px-5 py-2 h-full w-full rounded-full focus:outline-none'/>
          <div className='flex h-full gap-2 justify-center items-center'>
          <button className='dark:bg-purple-600 px-3 p-1 h-10 w-10 rounded-full dark:hover:bg-purple-800 flex items-center justify-center'>
            <MdAttachFile size={30}/>
            </button>
           <button 
           onClick={sendMessage}
            className='dark:bg-green-600 px-3 p-1 h-10 w-10  dark:hover:bg-green-800 flex items-center justify-center rounded-full mr-4'>
            <MdSend size={30}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
