import React, {useState} from 'react';
import {Checkbox, Icon} from 'antd';
import 'antd/dist/antd.css';

export default function Checklist(props) {

  const opts = props.opts;
  const [custom, setCustom] = useState('');


  const handleCheck = checked => {
    props.setChecked(checked);
  };


  const handleNew = () => {
    if (custom.length > 0) {
      let newOpts = [...opts, custom];
      setCustom('');
      props.setOpts(newOpts);
    }
  };


  return (
    <div className='Checklist'>

      <Checkbox.Group options={opts} onChange={handleCheck} className='thomasCheckGroup' />

      <div className='customCheckCont'>

        <Icon
          type="plus-circle"
          style={{fontSize: '18px', color: '#e6e6e6', marginLeft: '-1px'}}
          theme={custom === '' ? 'outlined' : 'twoTone'}
          onClick={() => handleNew()} />

        <input type='text' className='customCheckInput' onChange={e => setCustom(e.target.value)} value={custom} />

      </div>

    </div>
  );

}