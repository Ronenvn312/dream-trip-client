
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './page/Login';
import Home from './page/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
