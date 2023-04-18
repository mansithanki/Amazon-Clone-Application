
import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router,  Switch, Route, Routes}
from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import {auth} from "./firebase"
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js";
import {element, Elements} from "@stripe/react-stripe-js"


const promise = loadStripe('pk_test_51LKHN1AnYdiWLdnMJk7vfpLriixRGgRvdY7K58MU0EU3ub1Ijud1eHHi8e5s0jCKmYTdNhI8LULkOPiJ7OPqbBJn0075cZW6As')
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(()=>{
    //will only run once when the app component loads
    auth.onAuthStateChanged(authUser =>{
      console.log('The authorised user is', authUser)
      if (authUser){
        //the user just logged in/ the user was logged in
        dispatch({
          type:'SET_USER',
          user: authUser
        })
      }
      else{
        //the user is logged out
        dispatch({
          type:'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    //BEM convention
    
    <Router>
    <div className="app">
    

    <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/checkout" element={[<Header/>,<Checkout/>]} />
      </Routes>
      <Routes>
        <Route path="/payment" element={[<Header/>, <Elements stripe={promise}><Payment/></Elements>]} />
      </Routes>

      <Routes>
        <Route path="/" element={[<Header/>,<Home/>]} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
