import React, {useState, useEffect} from 'react';
import Emoji from './Emoji';

export default function Card0(props) {

  const res = props.res;
  const setInval = props.setInval;

  const [message, setMessage] = useState('');


  useEffect(() => {
    setInval(false);

    switch (res) {
    case 1:
      setMessage('B-A-D!');
      break;
    case 2:
      setMessage('So So. Could have been better.');
      break;
    case 3:
      setMessage('Fine, no complaints.');
      break;
    case 4:
      setMessage('Good!');
      break;
    case 5:
      setMessage('Stupendous!!');
      break;
    default:
      setMessage('');
    }

  }, [res, setMessage, setInval]);



  return (
    <div className='entryCard' style={props.invalid ? {borderColor: '#fea39e'} : {}}>

      <h2 className='entryHeader'>How has your day been, {props.user}?</h2>
      <p className='reqNote'>Required</p>

      <p className='entryCardMsg'>{message}</p>

      <div className='emojiContainer'>

        <Emoji
          src={require('../../img/emoji/bad.svg')}
          text='Bad (1)'
          selected={res === 1}
          click={() => props.setRes(1)} />

        <Emoji
          src={require('../../img/emoji/soso.svg')}
          text='So So (2)'
          selected={res === 2}
          click={() => props.setRes(2)} />

        <Emoji
          src={require('../../img/emoji/normal.svg')}
          text='Normal (3)'
          selected={res === 3}
          click={() => props.setRes(3)} />

        <Emoji
          src={require('../../img/emoji/good.svg')}
          text='Good (4)'
          selected={res === 4}
          click={() => props.setRes(4)} />

        <Emoji
          src={require('../../img/emoji/great.svg')}
          text='Great (5)'
          selected={res === 5}
          click={() => props.setRes(5)} />

      </div>

    </div>
  );
}

// props.setRes(1)
// props.setRes(2)
// props.setRes(3)
// props.setRes(4)
// props.setRes(5)