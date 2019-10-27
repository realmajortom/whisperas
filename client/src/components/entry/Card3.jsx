import React, {useState} from 'react';
import Checklist from './Checklist';


export default function Card3(props) {

  const [opts, setOpts] = useState([
    'Too many lows',
    'Too many highs',
    'Wonky boluses',
    'Dissatisfaction with my diet',
    'Poor quality sleep',
    'No exercise'
  ]);

  const setChecked = checked => {
    props.setRes(checked);
  };

  return (
    <div className='entryCard checkCard'>

      <h2 className='entryHeader'>Today's Setbacks</h2>

      <Checklist opts={opts} setChecked={setChecked} setOpts={setOpts} />

    </div>
  );
}