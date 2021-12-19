import React,{useState,useEffect} from 'react';
import {Link,Switch,Route,useHistory,useParams,BrowserRouter as Router} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './CSS/App.css';

import Home from './Home'
import History from './History.js';


function App() {
  const [value,setValue] = useState(true)
  const handleChange = () =>{
      setValue(!value)
  }

  
  return (
    <Router >
      <nav className="nav">
      <input type="checkbox" id="check" />
          <label For="check" className='checkButton' onClick={handleChange} ><i>{ value ? 'x' : <MenuIcon />}</i></label>
          <label  className='logo'><Link className='link'  to="/">MM</Link></label>
        <ul>
          <li ><Link className='link'  to="/">Home</Link></li>
          <li><Link className='link' to="/history">History</Link></li>
         
        </ul>
      </nav>

      <Switch>
       

        <Route path="/history">
          <History />
        </Route>

       

        <Route path="/">
            <Home />
        </Route>    
      </Switch>
    </Router>
  );
}

export default App;
