import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import * as AUTH_ACTIONS from './store/actions/auth.actions';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Apps/Auth/Login/Login';
import Logout from './Apps/Auth/Logout/Logout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AUTH_ACTIONS.authCheckState());
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
