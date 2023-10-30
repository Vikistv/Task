import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import List from './components/List/List';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import AddForm from './components/AddForm/AddForm';

function App() {
  return (
    <>
    {<Navbar/>}
<Routes>
  <Route path="/login" element={<Login/>}/>
  <Route path="/notes" element={<List/>}/>
  <Route path="/add" element={<AddForm/>}/>
  <Route path="/logout" element={<List/>}/>
</Routes>
</>

  );
}

export default App;
