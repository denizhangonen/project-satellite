import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import * as AUTH_ACTIONS from '../../../store/actions/auth.actions';
import { useSelector } from 'react-redux';

import IAuth from '../../../Shared/Models/Auth/IAuth';

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = (props) => {
  const auth = useSelector<any, IAuth>((state) => state.auth.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('calling');
    dispatch(AUTH_ACTIONS.logout());
  }, []);

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth]);

  return <div></div>;
};

export default Logout;
