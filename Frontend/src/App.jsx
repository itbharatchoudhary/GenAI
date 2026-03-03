import React from 'react'
import { RouterProvider } from "react-router"
import { router } from './App.routes'

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
