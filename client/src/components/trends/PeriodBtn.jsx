import React from 'react';

const active = {
  backgroundColor: '#abe8c2',
  borderColor: '#32e875'
};

export default function PeriodBtn(props) {

  return (
    <>
      <button
        style={props.active ? active : {}}
        className='PeriodBtn'
        onClick={props.click}
      >
        {props.text}
      </button>
    </>
  );
}