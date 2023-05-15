import React from 'react';
//import Search from './Search'
import Greet from './Welcome'
import '../App.css';

const Home = ({isAuthenticated}) =>{
  if(isAuthenticated)
  {
    return (
      <div className='App3'>
        <div>
          <h3></h3>
          <div>
          <Greet />
          </div>
        </div>
      </div>
    );
  }
  else if(!isAuthenticated){
    return (
      <div className='App2'>
        <div>
          <h3></h3>
          <div>
          <Greet />
          </div>
        </div>
        <div className='Product'>
          <h1>Product Definition</h1>
          <div>
            <h3>Vision:</h3>
            <p className='App2font'>To help consumers  find more sustainable and ethical clothing stores and enable consumers  to make more conscious fashion choices at their local clothing stores</p>
          </div>
          <div>
            <h3>Target Audience:</h3>
            <p className='App2font'>There is a use our app can provide for both those who are familiar with the sustainability of brands, and those who are not. The target audience is all fashion consumers, especially those who purchase items locally.</p>
          </div>
          <div>
          <h3>Problem:</h3>
            <p className='App2font'>Many fashion consumers may not be aware of the sustainability and ethics of the clothing stores near them, whether it is because they are not able to do the research because of time constraints, or it is made unavailable intentionally by the brand.</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;