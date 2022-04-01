import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import * as AUTH_ACTIONS from './store/actions/auth.actions';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Apps/Auth/Login/Login';
import Logout from './Apps/Auth/Logout/Logout';
import Dashboard from './Apps/Dashboard/Dashboard';

function App(props: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AUTH_ACTIONS.authCheckState());
  }, []);

  console.log('props: ', props);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
