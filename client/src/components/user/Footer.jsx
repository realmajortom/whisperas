import React from 'react';
import {Modal} from 'antd';

function info() {
  Modal.info({
    title: 'Privacy Info',
    maskClosable: true,
    maskStyle: {backgroundColor: 'rgba(0,0,0,.7)'},
    centered: true,
    content: (
      <div className='Modal'>
        <p>
          Cadence has been optimized for anonymity and privacy. This app does not use any fingerprinting, analytics, or personal identification techniques.
        </p>
        <p>
          All user and app data is stored in an encrypted database, passwords are never saved in plain-text form, and all communictions are over a secure TLS connection.
        </p>
        <p>
          An email address is not requested, required, demanded, nor desired to use this tool. Accounts are identified by their unique usernames.
        </p>
        <p>
          The 'Preferred Name' associated with your account is used to informally greet you in the app. If you have any qualms about your name or nickname being saved, please use a fictitous name (ex: LukeSkywalker, BuzzLightyear95, your_mom).
        </p>
        <p>
          I will never ever ever ever bother you with any promotions, newsletters, etc. If the stars fall from the heavens and hell freezes over, an unobtrusive in-app message will be given with any urgent notices.
        </p>
      </div>
    ),
    onOk() {}
  });
}

export default function Footer() {

  return (
    <div className='prefsFoot'>

      <div>
        <a className='prefsLink' href='https://github.com/tggir1/cadence' rel='noopener noreferrer' target='_blank' >
          View source code on GitHub
        </a>
      </div>

      <div>
        <a className='prefsLink' href='mailto:thomas@thomasg.dev' rel='noopener noreferrer' target='_blank' >
          Contact me
        </a>
      </div>

      <div className='prefsLink' onClick={info} >Privacy Info</div>

    </div>
  );

}