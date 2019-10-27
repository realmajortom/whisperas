import React, {useState} from 'react';
import {message, Tooltip} from 'antd';
import Footer from './Footer';
import axios from 'axios';


export default function Prefs(props) {

  const [vis, setVis] = useState('');
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [user3, setUser3] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [pass3, setPass3] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newPref, setNewPref] = useState('');


  const updateUsername = (e) => {
    e.preventDefault();

    axios.post('http://192.168.1.111:8080/user/update-un',
      {username: user1, newUsername: newUser, pass: pass1})
      .then(res => {
        if (res.data.success) {
          message.success('Username successfully updated');
          setUser1('');
          setNewUser('');
          setPass1('');
          setVis('');
        } else {
          message.error(res.data.message);
        }
      });
  };


  const updatePrefName = (e) => {
    e.preventDefault();

    axios.post('http://192.168.1.111:8080/user/update-pn',
      {username: user2, newPrefname: newPref, pass: pass2})
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('prefname', newPref);
          message.success('Preferred Name updated');
          setUser2('');
          setNewPref('');
          setPass2('');
          setVis('');
        } else {
          message.error(res.data.message);
        }
      });
  };


  const updatePass = (e) => {
    e.preventDefault();

    axios.post('http://192.168.1.111:8080/user/update-pass',
      {username: user3, newPass: newPass, pass: pass3})
      .then(res => {
        if (res.data.success) {
          message.success('Password successfully updated');
          setUser3('');
          setNewPass('');
          setPass3('');
          setVis('');
        } else {
          message.error(res.data.message);
        }
      });
  };


  return (
    <div className='Prefs' >

      <div>
        <div className='prefsTile' >

          <p className='bubbleTitle prefsTitle' onClick={() => setVis(vis === 'form1' ? '' : 'form1')}>Change Username</p>

          <form style={vis === 'form1' ? {} : {display: 'none'}}>

            <div className='userFormGroup mini'>

              <label htmlFor='current-username'>Current Username:</label>

              <input
                type='text'
                id='current-username'
                className='userField'
                placeholder=''
                autoComplete='username'
                onChange={e => setUser1(e.target.value)}
                required />

            </div>

            <div className='userFormGroup mini'>
              <label htmlFor='new-username'>New Username:</label>

              <Tooltip placement='topRight' title='4-60 characters'>
                <input
                  type='text'
                  id='new-username'
                  className='userField'
                  placeholder=''
                  autoComplete='off'
                  onChange={e => setNewUser(e.target.value)}
                  required />
              </Tooltip>

            </div>

            <div className='userFormGroup mini'>

              <label htmlFor='pass1'>Password:</label>

              <input
                type='password'
                id='pass1'
                className='userField'
                autoComplete='password'
                onChange={e => setPass1(e.target.value)}
                required />

            </div>

            <div className='userFormBtnWrap'>
              <button onClick={(e) => updateUsername(e)} className='userFormBtn' >Submit</button>
            </div>

          </form>

        </div>


        <div className='prefsTile'>

          <p className='bubbleTitle prefsTitle' onClick={() => setVis(vis === 'form2' ? '' : 'form2')}>Change Preferred Name</p>

          <form style={vis === 'form2' ? {} : {display: 'none'}}>

            <div className='userFormGroup mini'>

              <label htmlFor='current-username-2'>Username:</label>

              <input
                type='text'
                id='current-username-2'
                className='userField'
                placeholder=''
                autoComplete='username'
                onChange={e => setUser2(e.target.value)}
                required />

            </div>

            <div className='userFormGroup mini'>

              <label htmlFor='prefname'>New Preferred Name:</label>

              <Tooltip placement='topRight' title='1-60 characters'>
                <input
                  type='text'
                  id='username'
                  className='userField'
                  placeholder=''
                  autoComplete='off'
                  onChange={e => setNewPref(e.target.value)}
                  required />
              </Tooltip>
            </div>

            <div className='userFormGroup mini'>

              <label htmlFor='pass2'>Password:</label>

              <input
                type='password'
                id='pass2'
                className='userField'
                autoComplete='password'
                onChange={e => setPass2(e.target.value)}
                required />

            </div>

            <div className='userFormBtnWrap'>
              <button onClick={(e) => updatePrefName(e)} className='userFormBtn' >Submit</button>
            </div>

          </form>

        </div>


        <div className='prefsTile'>

          <p className='bubbleTitle prefsTitle' onClick={() => setVis(vis === 'form3' ? '' : 'form3')}>Reset Password</p>

          <form style={vis === 'form3' ? {} : {display: 'none'}}>

            <div className='userFormGroup mini'>

              <label htmlFor='current-username-3'>Username:</label>

              <input
                type='text'
                id='current-username-3'
                className='userField'
                placeholder=''
                autoComplete='username'
                onChange={e => setUser3(e.target.value)}
                required />

            </div>

            <div className='userFormGroup mini'>

              <label htmlFor='pass3'>Current Password:</label>

              <input
                type='password'
                id='pass3'
                className='userField'
                autoComplete='password'
                onChange={e => setPass3(e.target.value)}
                required />

            </div>

            <div className='userFormGroup mini'
            >
              <label htmlFor='new-pass'>New Password:</label>

              <Tooltip placement='topRight' title='8-60 characters'>
                <input
                  type='password'
                  id='new-pass'
                  className='userField'
                  autoComplete='off'
                  onChange={e => setNewPass(e.target.value)}
                  required />
              </Tooltip>
            </div>

            <div className='userFormBtnWrap'>
              <button onClick={(e) => updatePass(e)} className='userFormBtn' >Submit</button>
            </div>

          </form>

        </div>
      </div>


      <div className='userFormBtnWrap logoutWrap' style={vis === '' ? {} : {display: 'none'}}>
        <button onClick={(e) => props.logout(e)} className='userFormBtn logoutBtn' >Logout</button>
      </div>


      <div style={vis === '' ? {} : {display: 'none'}}>
        <Footer />
      </div>

    </div>
  );

}