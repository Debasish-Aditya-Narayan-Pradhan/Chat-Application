import React from 'react'
import { Route, Routes } from 'react-router';
import App from '../App';
import JoinCreateChat from '../componets/JoinCreateChat';
import ChatPage from '../componets/ChatPage';

function AppRoutes() {
  return (
      <Routes>
        <Route path='/' element={<JoinCreateChat/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
      </Routes>
  )
}

export default AppRoutes;
