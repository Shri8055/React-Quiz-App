import {React} from 'react';
import './App.scss';
import Main from './ui/Main';
import Quiz from './ui/Quiz';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/ui/Quiz' element={<Quiz/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;