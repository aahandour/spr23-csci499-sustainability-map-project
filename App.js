// import logo from './logo.svg';
import './App.css';
//import Search from './components/Search'
//import Greet from './components/Welcome'
import { Route, Routes } from "react-router-dom";
import Home from "./components/WelcomeHome"
import LoginSwitchpage from "./pages/LoginSwitchpage"
import RegisterSwitchpage from "./pages/RegisterSwitchpage"
import Navbar from "./navbar"
import HomeAfterLogin from "./components/HomeAfterLogin"
import Profile from "./components/Profile"
import Location from "./components/locationlist"



// import Image from './components/Images'
// import image1 from './images/image2.jpg'

function App() {

  return (
    <div className="App">

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
          <Route path="/login" element={<LoginSwitchpage />}/>
          <Route path="/signin" element={<RegisterSwitchpage />}/>
          <Route path="/H" element={<HomeAfterLogin />}/>
          <Route path="/P" element={<Profile />}/>
          <Route path="/l" element={<Location />}/>
        </Routes>
      </div> 

    </div>
  );
}

export default App;
