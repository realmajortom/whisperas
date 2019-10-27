import React, {useState} from 'react';
import Checklist from './Checklist';


export default function Card4(props) {

  const [opts, setOpts] = useState([
    'Increase basal rate',
    'Decrease basal rate',
    'Increase carb ratio',
    'Decrease carb ratio',
    'Dietary change',
    'Physical activity change'
  ]);

  const setChecked = checked => {
    props.setRes(checked);
  };

  return (
    <div className='entryCard checkCard'>

      <h2 className='entryHeader'>Treatment Changes</h2>

      <Checklist opts={opts} setChecked={setChecked} setOpts={setOpts} />

    </div>
  );
}