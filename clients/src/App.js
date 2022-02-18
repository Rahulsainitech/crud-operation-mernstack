import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dataupdate from './components/Dataupdate';
import AddData from './components/AddData';

const App = () => {
  return (
    <>
     <Navbar/>
      <Routes>
        <Route exact path='/GET'element={<Home />}/>
        <Route exact path='/'element={<AddData />}/>
        {/* <Route exact path='/product' element={<Product />} /> */}
        <Route exact path='/PUT/:id' element={<Dataupdate />}/>
      </Routes> 
    </>
  )
}

export default App