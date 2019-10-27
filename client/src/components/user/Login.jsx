import React from 'react';

export default function Login(props) {
  return (

    <div className='userFormArea'>

      <form className='userForm'>

        <div className='userFormGroup'>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' className='userField' placeholder='harryman19' autoComplete='username' onChange={e => props.setUsername(e.target.value)} required />
        </div>

        <div className='userFormGroup'>
          <label htmlFor='pass'>Password:</label>
          <input type='password' id='pass' className='userField' autoComplete='password' onChange={e => props.setPass(e.target.value)} required />
        </div>

        <div className='userFormBtnWrap'>
          <button onClick={(e) => props.btn(e)} className='userFormBtn'>Login</button>
        </div>

      </form>

      <p className='formSwitch' style={props.pos} onClick={() => props.setForm('register')}>
        New user? Click here to register!
      </p>

    </div>
  );
}