import { useState } from 'react'
import Home from './sections/Home/Home';
import Questions from './sections/Questions/Questions';


function App() {
  
  const [category, setCategory] = useState<"javascript"|"typescript"|"react"| "mixed" | null>(null);


  return (
    <>
    {category ? 
    <Questions category={category}/>
    :
    <Home setCategory={setCategory} />
  }
    </>
  )
}

export default App
