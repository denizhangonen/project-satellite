import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import * as AUTH_ACTIONS from './store/actions/auth.actions';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Apps/Auth/Login/Login';
import Logout from './Apps/Auth/Logout/Logout';
import Dashboard from './Apps/Dashboard/Dashboard';

import Navbar from './Components/Navbar/Navbar';
import IAuth from './Shared/Models/Auth/IAuth';

function App(props: any) {
  const auth = useSelector<any, IAuth>((state) => state.auth.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AUTH_ACTIONS.authCheckState());
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={auth} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
