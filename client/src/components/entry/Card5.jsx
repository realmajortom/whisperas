import React from 'react';
import {Progress} from 'antd';


export default function Card5(props) {
  const len = props.res.length;

  return (
    <div className='entryCard'>

      <h2 className='entryHeader'>Comments</h2>

      <p className='entryCardSub'>Enter an optional, tweet-like thought!</p>

      <textarea
        maxLength='140'
        id='entryTextArea'
        onChange={e => props.setRes(e.target.value)}
        placeholder='Max 140 chars.' />

      <Progress percent={Math.round((len / 140) * 100)} size="small" showInfo={false} />

    </div>
  );
}