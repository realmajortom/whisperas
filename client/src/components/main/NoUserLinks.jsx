import React from 'react';
import {Link} from 'react-router-dom';

export default function NoUserLinks() {

  return (

    <div className='NoUserLinks mainPage'>

      <div>
        <p id='welcomeHead'>Welcome to Cadence!</p>
        <p id='instructions'>Please login or register to continue.</p>
      </div>

      <div className='userFormBtnWrap homeBtnWrap'>
        <div>
          <Link to='/user'>
            <div className='userFormBtn homeBtn'>Login</div>
          </Link>
        </div>
      </div>

      <div></div>

    </div>

  );

}