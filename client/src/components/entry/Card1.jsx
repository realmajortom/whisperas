import React, {useState, useEffect} from 'react';
import Emoji from './Emoji';


export default function Card1(props) {

  const genScr = props.genScore;
  const res = props.res;
  const setInval = props.setInval;

  const [header, setHeader] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    switch (genScr) {
    case 1:
    case 2:
      setHeader('Bummer! Hopefully tomorrow is better.\n\nHow did everything go health-wise?');
      break;
    case 3:
      setHeader('Cool, cool. How would you rate your health today?');
      break;
    case 4:
    case 5:
      setHeader('Awesome! How would you rate your health today?');
      break;
    default:
      setHeader('How would you rate your health today?');
      break;
    }
  }, [genScr, setHeader]);

  useEffect(() => {
    setInval(false);

    switch (res) {
    case 1:
      setMessage('Total roller coaster from start to finish. Awful!');
      break;
    case 2:
      setMessage('Today was difficult.\nMore lows and highs than normal.');
      break;
    case 3:
      setMessage('Fine, no issues to report 👍');
      break;
    case 4:
      setMessage('Sugars have been pretty decent.\nI feel good!');
      break;
    case 5:
      setMessage('Sugars are in great shape!\nI feel awesome!!');
      break;
    default:
      setMessage('');
    }
  }, [res, setMessage, setInval]);


  return (
    <div className='entryCard' style={props.invalid ? {borderColor: '#fea39e'} : {}}>

      <h2 className='entryHeader'>{header}</h2>
      <p className='reqNote'>Required</p>

      <p className='entryCardMsg'>{message}</p>

      <div className='emojiContainer'>

        <Emoji
          src={require('../../img/emoji/bad.svg')}
          text='Bad (1)'
          selected={props.res === 1}
          click={() => props.setRes(1)} />

        <Emoji
          src={require('../../img/emoji/soso.svg')}
          text='So So (2)'
          selected={props.res === 2}
          click={() => props.setRes(2)} />

        <Emoji
          src={require('../../img/emoji/normal.svg')}
          text='Normal (3)'
          selected={props.res === 3}
          click={() => props.setRes(3)} />

        <Emoji
          src={require('../../img/emoji/good.svg')}
          text='Good (4)'
          selected={props.res === 4}
          click={() => props.setRes(4)} />

        <Emoji
          src={require('../../img/emoji/great.svg')}
          text='Great (5)'
          selected={props.res === 5}
          click={() => props.setRes(5)} />

      </div>
    </div>
  );
}