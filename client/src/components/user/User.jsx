import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Reg from './Reg';
import Prefs from './Prefs';

export default function User() {


  const [form, setForm] = useState(null);
  const [message, setMessage] = useState('');
  const [userLog, setUserLog] = useState('');
  const [passLog, setPassLog] = useState('');
  const [userReg, setUserReg] = useState('');
  const [passReg, setPassReg] = useState('');
  const [prefname, setPrefname] = useState('');
  const [redirect, setRedirect] = useState(null);


  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      setForm('login');
    } else {
      setForm('prefs');
    }
  }, [setForm]);


  const loginProcedure = (token, prefname) => {
    localStorage.setItem('token', token);
    localStorage.setItem('prefname', prefname);
    setRedirect('/');
  };


  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('prefname');
    localStorage.removeItem('entries');
    setRedirect('/');
  };


  const handleLogin = (e) => {
    e.preventDefault();

    if (userLog.length < 4 || userLog.length > 60) {
      setMessage('Hint: Your username contains between 4 & 60 characters :)');
    } else if (passLog.length < 8 || passLog.length > 60) {
      setMessage('Hint: Your password contains between 8 & 60 characters :)');
    } else {
      axios.post('https://whisperas.appspot.com/api/user/login',
        {username: userLog, pass: passLog}).then(res => {
          if (res.data.success) {
            loginProcedure(res.data.token, res.data.prefname);
          } else {
            setMessage(res.data.message);
          }
        });
    }
  };


  const handleReg = (e) => {
    e.preventDefault();

    if (prefname.length < 1 || prefname.length > 60) {
      setMessage('Preferred Name must contain between 1 & 60 characters');
    } else if (userReg.length < 4 || userReg.length > 60) {
      setMessage('Username must contain between 4 & 60 characters');
    } else if (passReg.length < 8 || passReg.length > 60) {
      setMessage('Password must contain between 8 & 60 characters');
    } else {
      axios.post('https://whisperas.appspot.com/api/user/register',
        {prefname: prefname, username: userReg, pass: passReg}).then(res => {
          if (res.data.success) {
            loginProcedure(res.data.token, res.data.prefname);
          } else {
            setMessage(res.data.message);
          }
        });
    }
  };


  if (redirect) {
    return (<Redirect push to={redirect} />);
  } else {

    return (
      <div className='User mainPage'>

        <h1>{form === 'login' ? 'Login' : form === 'register' ? 'Register' : 'Preferences'}</h1>

        <h2>{message}</h2>

        {form === 'login'
          ? <Login
            setUsername={setUserLog}
            setPass={setPassLog}
            btn={handleLogin}
            setForm={setForm}
          />
          : form === 'register'
            ? <Reg
              setUsername={setUserReg}
              setPass={setPassReg}
              setPrefname={setPrefname}
              btn={handleReg}
              setForm={setForm}
            />
            : form === 'prefs'
              ? <Prefs logout={logout} />
              : (<div></div>)
        }
      </div>
    );
  }
}
