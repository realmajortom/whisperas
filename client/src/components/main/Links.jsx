import React from 'react';
import LinkBubble from './LinkBubble';

export default function Links() {

  return (
    <div className='Links'>

      <LinkBubble title='History' icn={require('../../img/nav/cal.svg')} url='/history' />
      <LinkBubble title='Trends' icn={require('../../img/nav/trends.svg')} url='/trends' />
      <LinkBubble title='User' icn={require('../../img/nav/user.svg')} url='/user' />
      <LinkBubble title='Resources' icn={require('../../img/nav/link.svg')} url='/resources' />

    </div>
  );
}