import React from 'react'
import { Provider } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/navbar/Navbar'
import { NoMatchRoute } from './components/noMatchRoute/NoMatchRoute'
import { UpdateUserDetails } from './components/userTabManagement/updateUserDetails/UpdateUserDetails'
import { UserDetails } from './components/userTabManagement/UserDetails'
import UsersTab from './components/userTabManagement/UsersTab'
import store from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
          <Navbar/>
        <Routes>
          <Route path='/' element={<Navigate to="/admin"/>} />
          <Route path='/admin' element={<UsersTab/>}/>       
          <Route path='admin/:userID' element={<UserDetails/>}/>
          <Route path='employee/:userID' element={<UserDetails/>}/>
          <Route path='admin/:userID/update' element={<UpdateUserDetails/>} />
          <Route path='employee/:userID/update' element={<UpdateUserDetails/>} />
          <Route path='/employee' element={<UsersTab/>} />
          <Route path="*" element={<NoMatchRoute/>}/>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
