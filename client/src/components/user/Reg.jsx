import React from 'react';
import {Tooltip} from 'antd';

export default function Reg(props) {
  return (

    <div className='userFormArea'>

      <form className='userForm'>

        <div className='userFormGroup'>
          <label htmlFor='prefname'>Preferred Name:</label>

          <Tooltip placement='topRight' title='1-60 characters'>
            <input
              type='text'
              d='prefname'
              className='userField'
              placeholder='Harry'
              autoComplete='given-name'
              onChange={e => props.setPrefname(e.target.value)}
              required />
          </Tooltip>
        </div>


        <div className='userFormGroup'>
          <label htmlFor='email'>Username:</label>

          <Tooltip placement='topRight' title='4-60 characters'>
            <input
              type='text'
              id='email'
              className='userField'
              placeholder='harryman88'
              autoComplete='username'
              onChange={e => props.setUsername(e.target.value)}
              required />
          </Tooltip>
        </div>

        <div className='userFormGroup'>
          <label htmlFor='pass'>Password:</label>

          <Tooltip placement='topRight' title='8-60 characters'>
            <input
              type='password'
              id='pass'
              className='userField'
              autoComplete='new-password'
              onChange={e => props.setPass(e.target.value)}
              required />
          </Tooltip>
        </div>

        <div className='userFormBtnWrap'>
          <button onClick={(e) => props.btn(e)} className='userFormBtn' >Register</button>
        </div>

      </form>


      <p className='formSwitch' style={props.pos} onClick={() => props.setForm('login')} >
        Go to Login form!
      </p>

    </div>
  );
}
