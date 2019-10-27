import React from 'react';
import {Link} from 'react-router-dom';

export default function LinkBubble(props) {

  return (
    <div>
      <Link to={props.url}>
        <div className='LinkBubble'>
          <img className='bubbleIcn' src={props.icn} alt='' />
          <p className='bubbleTitle'>{props.title}</p>
        </div>
      </Link>
    </div>
  );
}