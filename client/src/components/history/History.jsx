import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {message} from 'antd';
import HistoryTile from './HistoryTile';


export default function History() {

  const token = localStorage.getItem('token');

  const [hist, setHist] = useState([]);
  const [reload, setReload] = useState(false);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {

    if (token !== null) {
      axios.get('http://192.168.1.111:8080/journal/my-entries',
        {headers: {Authorization: `JWT ${token}`}})
        .then(res => {
          if (res.data.success) {
            localStorage.setItem('entries', JSON.stringify(res.data.entries));
            setHist(res.data.entries);
          } else {
            message.error(res.data.message);
          }
          setLoaded(true);
        });
    } else {
      message.error('Please log in to continue!');
    }

  }, [setHist, token]);


  useEffect(() => {
    if (reload === true) {
      setHist(JSON.parse(localStorage.getItem('entries')));
      setReload(false);
    }
  }, [reload, setReload, setHist]);

  useEffect(() => {
    if (loaded && hist.length === 0) {
      message.warning('Hit the big plus button to make an entry!');
    }
  }, [loaded, hist]);


  const tiles = hist.map(i => (<HistoryTile data={i} key={i._id} reload={setReload} />));


  return (
    <div className='mainPage History'>

      <h1>History</h1>

      <div className='histScrollCont'>
        {tiles}
      </div>

    </div>
  );
}