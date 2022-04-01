import React, { FormEvent, useEffect, useState } from 'react';

import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import * as AUTH_ACTIONS from '../../../store/actions/auth.actions';
import IAuth from '../../../Shared/Models/Auth/IAuth';

import GoogleLogin from 'react-google-login';

import { useSelector } from 'react-redux';

import Google from '../img/google.png';
import Facebook from '../img/facebook.png';
import Github from '../img/github.png';

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useLocation();

  console.log('props :', props);

  const auth = useSelector<any, IAuth>((state) => state.auth.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const emailInfo = new URLSearchParams(search.search).get('email');
    const token = new URLSearchParams(search.search).get('token');
    const name = new URLSearchParams(search.search).get('name');
    const profilePic = new URLSearchParams(search.search).get('profilePicture');

    console.log('search : ', search);
    console.log('token:', token);
    console.log('email:', emailInfo);
    console.log('name:', name);
    console.log('profilePicture:', profilePic);

    const data = {
      email: emailInfo,
      token,
      name,
      profilePic,
    };

    dispatch(AUTH_ACTIONS.socialLoginCompleted(data));
  }, []);

  useEffect(() => {
    if (auth && auth.token && auth.userId) {
      navigate('/dashboard');
    }
  }, [auth]);

  const googleHandler = () => {
    window.open('http://localhost:8080/auth/passport-google', '_self');
  };

  const gitHubHandler = () => {
    window.open('http://localhost:8080/auth/passport-github', '_self');
  };

  const facebookHandler = () => {
    window.open('http://localhost:8080/auth/passport-facebook', '_self');
  };

  const twitterHandler = () => {
    window.open('http://localhost:8080/auth/passport-twitter', '_self');
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={googleHandler}>
            {/* <img src={Google} alt="" className="icon" /> */}
            Google
          </div>
          <div className="loginButton facebook" onClick={facebookHandler}>
            {/* <img src={Facebook} alt="" className="icon" /> */}
            Facebook
          </div>
          <div className="loginButton github" onClick={gitHubHandler}>
            {/* <img src={Github} alt="" className="icon" /> */}
            Github
          </div>
          <div className="loginButton twitter" onClick={twitterHandler}>
            {/* <img src={Github} alt="" className="icon" /> */}
            Twitter
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
