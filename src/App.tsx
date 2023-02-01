import AddCard from './AddCard'
import RenderCards from './RenderCards'
import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="container">
      <AddCard />
      <RenderCards />
    </div>
  )
}

export default App
