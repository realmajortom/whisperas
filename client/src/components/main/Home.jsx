import React from 'react';
import NoUserLinks from './NoUserLinks';
import Links from './Links';

export default function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className='welcome mainPage'>

      <h1 id='welcomeh1'>Whisperas</h1>
      <h2>The Pancreas Whisperer</h2>

      {token ? <Links /> : <NoUserLinks />}

    </div>
  );
}