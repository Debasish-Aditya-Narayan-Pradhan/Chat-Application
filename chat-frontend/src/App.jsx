import { useState } from 'react'
import './App.css'
import toast from 'react-hot-toast'

function App() {

  return (
    <>
      <h1>Hello it is App</h1>
      <button className="text-gray-50" onClick={() =>
        {
          toast.success("Clicked Successfully!")
        }
      }>Click me</button>
    </>
  )
}

export default App
