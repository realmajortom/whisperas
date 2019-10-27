import React, {useState} from 'react';
import Checklist from './Checklist';

export default function Card2(props) {

  const [opts, setOpts] = useState([
    'No (or few) lows',
    'No (or few) highs',
    'Well-timed boluses',
    'Satisfied with my meals',
    'Quality sleep last night',
    '20 minute exercise'
  ]);

  const setChecked = checked => {
    props.setRes(checked);
  };


  return (
    <div className='entryCard checkCard'>

      <h2 className='entryHeader'>Today's Wins</h2>

      <Checklist opts={opts} setChecked={setChecked} setOpts={setOpts} />

    </div>
  );
}
