import React, { FormEvent, useEffect, useState } from 'react';

import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import * as AUTH_ACTIONS from '../../../store/actions/auth.actions';
import IAuth from '../../../Shared/Models/Auth/IAuth';

import GoogleLogin from 'react-google-login';

import { useSelector } from 'react-redux';

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

  const login = async (code: any) => {
    console.log('login function');
    return fetch('http://localhost:8080/auth/login-with-google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    }).then((res) => {
      console.log('res is OK');
      if (res.ok) {
        return res.json();
      } else {
        console.log('----res is NOT OK');
        return Promise.reject(res);
      }
    });
  };

  const responseGoogle = async (authResult: any) => {
    console.log('responseGoogle - authResult:', authResult);
    try {
      if (authResult['code']) {
        const result = await login(authResult['code']);
        console.log(authResult);
        console.log('result : ', result);
        dispatch(AUTH_ACTIONS.socialLoginCompleted(result));
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const googleHandler = () => {
    window.open('http://localhost:8080/auth/passport-google', '_self');
  };

  const gitHubHandler = () => {
    window.open('http://localhost:8080/auth/passport-github', '_self');
  };

  const facebookHandler = () => {
    window.open('http://localhost:8080/auth/passport-facebook', '_self');
  };

  return (
    <div>
      <div>
        <p>
          <button onClick={googleHandler}>Login with Google</button>
        </p>
        <p>
          <button onClick={gitHubHandler}>Login with GitHub</button>
        </p>
        <p>
          <button onClick={facebookHandler}>Login with Facebook</button>
        </p>

        <GoogleLogin
          // use your client id here
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
          buttonText="Login with google"
          responseType="code"
          /**
           * To get access_token and refresh_token in server side,
           * the data for redirect_uri should be postmessage.
           * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
           */
          redirectUri="login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
};

export default Login;
