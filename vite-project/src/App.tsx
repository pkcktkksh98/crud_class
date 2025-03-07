import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './page/Home'
import Note from './page/Note'

import { ThemeProvider } from  'styled-components';
import {ToastContainer} from 'react-toastify'

const theme = {
  colors:{
    primary:"#ea2686",
    secondary:"#111",
    white:"#fff",
    yellow:"#ffd00d",
    grey:{
      light:"#f1f1f1",
      main:"#9e9e9e",
      dark:"616161"
    }
  }
}
function App() {
  return (
    <>
      <ToastContainer  />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/note/:id" element={<Note/>} />
          </Routes>
        </Router>
      </ThemeProvider>

    </>
  )
}

export default App
