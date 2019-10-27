import React from 'react';

const emoji = {
  1: {
    src: require('../../img/emoji/bad.svg'),
    alt: 'Bad'
  },
  2: {
    src: require('../../img/emoji/soso.svg'),
    alt: 'So so'
  },
  3: {
    src: require('../../img/emoji/normal.svg'),
    alt: 'Normal'
  },
  4: {
    src: require('../../img/emoji/good.svg'),
    alt: 'Good'
  },
  5: {
    src: require('../../img/emoji/great.svg'),
    alt: 'Great'
  }
};

export default function EmojiTile(props) {

  if (props.scr === null) {
    return (
      <div className='scrTile histMiniCont' ></div>
    );
  } else {
    return (

      <div className='scrTile histMiniCont' >

        <h3 className='histMiniHeader'>
          {props.type === 'health' ? 'Health:' : 'General:'}
        </h3>

        <img src={emoji[`${props.scr}`]['src']} alt={emoji[`${props.scr}`]['alt']} className='histMoji' />

      </div>

    );
  }

}