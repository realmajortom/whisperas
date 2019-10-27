import React from 'react';

export default function ListTile(props) {

  return (
    <div className={'histMiniCont ' + (props.trends === true && 'trendTile')} style={props.data.length < 1 ? {display: 'flex', alignItems: 'center'} : {}} >
      <h3 className='histMiniHeader' >{props.title}</h3>
      <ul className='histList'>{props.data}</ul>
    </div>
  );
}