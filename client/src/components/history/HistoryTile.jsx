import React, {useState} from 'react';
import EmojiTile from '../dataTiles/EmojiTile';
import ListTile from '../dataTiles/ListTile';
import axios from 'axios';
import {Icon, message, Popconfirm} from 'antd';

const emoji = {
  1: {
    location: require('../../img/emoji/bad.svg'),
    alt: 'Bad'
  },
  2: {
    location: require('../../img/emoji/soso.svg'),
    alt: 'So so'
  },
  3: {
    location: require('../../img/emoji/normal.svg'),
    alt: 'Normal'
  },
  4: {
    location: require('../../img/emoji/good.svg'),
    alt: 'Good'
  },
  5: {
    location: require('../../img/emoji/great.svg'),
    alt: 'Great'
  }
};

const dShort = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const dLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export default function HistoryTile(props) {

  const d = props.data;
  const [exp, setExp] = useState(false);


  const handleDelete = () => {
    const token = localStorage.getItem('token');
    axios.post(`http://192.168.1.111:8080/journal/delete/${d._id}`,
      {},
      {headers: {Authorization: `JWT ${token}`}})
      .then(res => {
        if (res.data.success) {
          message.success(res.data.message);
          localStorage.setItem('entries', JSON.stringify(res.data.entries));
          props.reload(true);
        } else {
          message.error(res.data.message);
        }
      });
  };


  const stopProp = (e) => {
    e.stopPropagation();
  };


  const wins = d.wins.map(i => (<li key={`${i}-1`}>{i}</li>));
  const setbacks = d.setbacks.map(i => (<li key={`${i}-2`}>{i}</li>));
  const treatChanges = d.treatChanges.map(i => (<li key={`${i}-3`}>{i}</li>));

  return (

    <div className='HistoryTile' onClick={() => setExp(!exp)}>

      <div className='histTileUpper'>

        <h2 className='histDate'>
          {exp ? `${dLong[d.day]}, ${d.month}/${d.date}` : `${dShort[d.day]}, ${d.month}/${d.date}`}
        </h2>

        <div className='histCounts' style={exp ? {display: 'none'} : {}}>
          <p className='p'>{`Wins: ${d.wins.length}`}</p>
          <p className='p'>{`Setbacks: ${d.setbacks.length}`}</p>
          <p className='p'>{`Treatment Changes: ${d.treatChanges.length}`}</p>
        </div>

        <img
          src={emoji[`${d.genScore}`]['location']}
          alt={emoji[`${d.genScore}`]['alt']}
          className='histMoji'
          style={exp ? {display: 'none'} : {}}
        />

        <div style={exp ? {fontSize: '20px'} : {display: 'none'}} >
          <Popconfirm
            title='Are you sure you want to delete this?'
            onConfirm={() => handleDelete()}
            onCancel={(e) => stopProp(e)}
            placement='leftTop'
            okText='Yes'
            okType='danger'
          >
            <button onClick={(e) => stopProp(e)}><Icon type='delete' /></button>
          </Popconfirm>
        </div>

      </div>


      <div className='histTileLower' style={exp ? {} : {display: 'none'}} >

        <div className='scrCont'>

          <EmojiTile type='health' scr={d.healthScore} />

          <EmojiTile type='gen' scr={d.genScore} />

        </div>

        <ListTile data={wins} title='Wins' />
        <ListTile data={setbacks} title='Setbacks' />
        <ListTile data={treatChanges} title='Treatment Changes' />

        <div className='histMiniCont' style={d.comment.length < 1 ? {display: 'flex', alignItems: 'center'} : {}} >
          <h3 className='histMiniHeader'>Comment</h3>
          <p className='commentP'>{d.comment}</p>
        </div>

      </div>

    </div>
  );
}