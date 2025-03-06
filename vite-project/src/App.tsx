import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './page/Home'
import Note from './page/Note'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/note/:id" element={<Note/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
