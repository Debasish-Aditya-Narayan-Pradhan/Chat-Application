import { createContext, useContext, useState } from "react";

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");
    const [connected, setConnected] = useState(false);
  
    console.log("ChatProvider state:", { roomId, userName, connected }); // Add this line to check state
  
    return (
      <ChatContext.Provider 
      value={{ roomId, userName, connected, setConnected, setRoomId, setUserName }}>
        {children}
      </ChatContext.Provider>
    );
  };

const useChatContext = () => 
{
    return useContext(ChatContext);
}

export default useChatContext