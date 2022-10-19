import './App.css';
import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import All from './components/All';
import Landing from './components/Landing';
import FarmerHome from './components/FarmerHome';
import AddItem from './components/AddItem';
import Cart from './components/cart';
import EditItem from './components/EditItem';
import CustomerUpdate from './components/CustomerUpdate';
import FarmerUpdate from './components/FarmerUpdate';
import PharmacistRegister from './components/PharmacistReg';
import ShopProducts from './components/ShopProducts';
import ClientChat from './components/ClientChat';
import PharmacistChatList from './components/pharmacistChatList';
import PharmacistChat from './components/pharmacistChat';
import Pres from './components/AllFiles';
import PresUpload from './components/UploadArea';
import CheckPres from './components/pharmacistPres';

import { initialState, reducer } from '../src/reducer/UseReducer';

export const UserContext = createContext();

const Routing = () => {

  return(
    <Routes>
      <Route path='/log' element={<Login />} />
      <Route path='/reg' element={<Register />} />
      <Route path='/checkpres' element={<CheckPres />} />
      <Route path='/farmerhome' element={<FarmerHome />} />
      <Route path='/additem' element={<AddItem />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/cusupdate' element={<CustomerUpdate />} />
      <Route path='/farupdate' element={<FarmerUpdate />} />
      <Route path='/edititem' element={<EditItem />} />
      <Route path='/home' element={<All />} />
      <Route path='/phreg' element={<PharmacistRegister />} />
      <Route path='/clientchat' element={<ClientChat />} />
      <Route path='/pharmacistchat' element={<PharmacistChatList />} />
      <Route path='/pres' element={<Pres />} />
      <Route path='/presUpload' element={<PresUpload />} />
      <Route path='/PharmacistChat/:sid' element={<PharmacistChat />} />
      <Route path='/shopproducts/:email' element={<ShopProducts />} />
      <Route path='/' element={<Landing />} />
    </Routes>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Router>
        <UserContext.Provider value={{state, dispatch}}>
        <Header />
          <br/>
          <br/>
          <Routing />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
