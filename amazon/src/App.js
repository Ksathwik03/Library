import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './Screen/Home';
import {BrowserRouter,Route} from 'react-router-dom'
import Detail from './Screen/Detail';

function App() {
  return (
    <div>
    <Navbar></Navbar>
    <BrowserRouter>
    <Route exact path = '/' component = {Home}></Route> 
    <Route exact path = '/product/:id' component = {Detail}></Route> 
    </BrowserRouter>
    </div>
  );
}

export default App;
