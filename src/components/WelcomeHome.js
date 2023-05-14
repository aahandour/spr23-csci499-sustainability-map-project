import React from 'react';
//import Search from './Search'
import Greet from './Welcome'
import Navbar from "../navbar"
import '../App.css';

const Home = () =>{
  return (
    <div>
      <Navbar/>
      <div>
        <h3></h3>
        <div>
        <Greet />

        <iframe width="50%" height="700" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=8ave%20brookly,%20ny+(map)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/sport-gps/">gps watches</a></iframe>

        </div>
      </div>
      <div className='Product'>
        <h1>Product Definition</h1>
        <div>
          <h3>Vision:</h3>
          <p>To help consumers  find more sustainable and ethical clothing stores and enable consumers  to make more conscious fashion choices at their local clothing stores</p>
        </div>
        <div>
          <h3>Target Audience:</h3>
          <p>There is a use our app can provide for both those who are familiar with the sustainability of brands, and those who are not. The target audience is all fashion consumers, especially those who purchase items locally.</p>
        </div>
        <div>
        <h3>Problem:</h3>
          <p>Many fashion consumers may not be aware of the sustainability and ethics of the clothing stores near them, whether it is because they are not able to do the research because of time constraints, or it is made unavailable intentionally by the brand.</p>
        </div>
      </div>
    </div>
  );
}
export default Home;