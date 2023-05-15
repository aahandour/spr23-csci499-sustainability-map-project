// import logo from './logo.svg';
import './App.css';
//import Search from './components/Search'
//import Greet from './components/Welcome'
import { Route, Routes } from "react-router-dom";
import Home from "./App1"
import Profile from "./components/Profile"
import Favorite_stores from "./components/Profile"



// import Image from './components/Images'
// import image1 from './images/image2.jpg'

function App() {
  
  return (
    <div>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      
      {/* <img src={image1} alt=""/> */}
      
      {/* <Router>
      <navbar />
      <Routes>
        <Route path='/' extra component={Home} />
        <Route path='/log_in' component={LoginSwitchpage} />
        <Route path='/sign_in' component={RegisterSwitchpage} />
      </Routes>
    </Router> */}
    {/* <Home /> */}
      {/* <div className="bar-nav">
        <Navbar/>
      </div> */}
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/favorite_stores" element={<Favorite_stores/>}/>
        </Routes>
      </div> 

    </div>
  );
}

export default App;
