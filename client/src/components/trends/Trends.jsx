import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Icon, message} from 'antd';
import PeriodBtn from './PeriodBtn';
import EmojiTile from '../dataTiles/EmojiTile';
import ListTile from '../dataTiles/ListTile';
import InfoModal from './InfoModal';


export default function Trends() {

  const token = localStorage.getItem('token');

  const [hist, setHist] = useState([]);
  const [period, setPeriod] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [winModes, setWinModes] = useState([]);
  const [genScrAvg, setGenScrAvg] = useState(null);
  const [badPeriod, setBadPeriod] = useState(null);
  const [treatModes, setTreatModes] = useState([]);
  const [setbackModes, setSetbackModes] = useState([]);
  const [healthScrAvg, setHealthScrAvg] = useState(null);


  // Get history from server
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


  // If less than 7 entries, default period is 'All Time'. Otherwise default is '7 Days'
  useEffect(() => {
    if (loaded && hist.length >= 7) {
      setPeriod(7);
    } else if (loaded) {
      setPeriod('all');
    }
  }, [hist, loaded, setPeriod]);


  // Determine if there is sufficient data for the selected period
  useEffect(() => {
    if (loaded && (hist.length < period || hist.length === 0)) {
      setBadPeriod(true);
    } else if (loaded) {
      setBadPeriod(false);
    }
  }, [hist, period, loaded, setBadPeriod]);


  // User logged in but no entries - notify to add entry
  useEffect(() => {
    if (loaded && hist.length === 0) {
      message.warning('Hit the big plus button to make an entry!');
    }
  }, [loaded, hist]);


  const getAvg = (h, type, set) => {
    let scrs = [];
    for (let i = 0; i < h.length; i++) {
      scrs.push(h[i][type]);
    }
    let avg = Math.round(scrs.reduce((a, b) => a += b) / h.length);
    set(avg);
  };


  const getMode = (h, type, set) => {
    let res = [];

    for (let i = 0; i < h.length; i++) {
      res.push(h[i][type]);
    }

    let flat = res.flat();
    let modeMap = {};
    let maxCount = 1;
    let modes = [];

    for (let i = 0; i < flat.length; i++) {
      let el = flat[i];

      if (modeMap[el] == null) {
        modeMap[el] = 1;
      } else {
        modeMap[el]++;
      }

      if (modeMap[el] > maxCount) {
        modes = [el];
        maxCount = modeMap[el];
      } else if (modeMap[el] === maxCount) {
        modes.push(el);
        maxCount = modeMap[el];
      }
    }
    set(modes);
  };


  useEffect(() => {
    if (badPeriod === false) {

      let p = (period === 'all' ? hist.length : period);
      let histMod = hist.slice(0, p);

      getAvg(histMod, 'genScore', setGenScrAvg);
      getAvg(histMod, 'healthScore', setHealthScrAvg);

      getMode(histMod, 'wins', setWinModes);
      getMode(histMod, 'setbacks', setSetbackModes);
      getMode(histMod, 'treatChanges', setTreatModes);
    }
  }, [loaded, badPeriod, hist, period]);


  const wins = winModes.map(i => (<li key={`${i}-11`}>{i}</li>));
  const setbacks = setbackModes.map(i => (<li key={`${i}-12`}>{i}</li>));
  const treatChanges = treatModes.map(i => (<li key={`${i}-13`}>{i}</li>));


  return (
    <div className='mainPage Trends'>

      <div className='trendHeaderCont'>
        <h1 className='trendHeader'>Trends</h1>
        <button className='infoBtn' onClick={InfoModal}><Icon type='info-circle' style={{fontSize: '18px'}} /></button>
      </div>


      <div className='periodBtns'>
        <PeriodBtn active={period === 'all'} click={() => setPeriod('all')} text='All Time' />
        <PeriodBtn active={period === 7} click={() => setPeriod(7)} text='7 Days' />
        <PeriodBtn active={period === 30} click={() => setPeriod(30)} text='30 Days' />
        <PeriodBtn active={period === 365} click={() => setPeriod(365)} text='1 Year' />
      </div>

      <div className='trendsScrollCont'>

        <div className='scrCont' style={badPeriod || !loaded ? {display: 'none'} : {}} >
          <EmojiTile type='health' scr={healthScrAvg} />
          <EmojiTile type='gen' scr={genScrAvg} />
        </div>

        <div className='modeTiles' style={badPeriod || !loaded ? {display: 'none'} : {}} >
          <ListTile data={wins} title='Wins' trends={true} />
          <ListTile data={setbacks} title='Setbacks' trends={true} />
          <ListTile data={treatChanges} title='Treatment Changes' trends={true} />
        </div>

        <div className='trendMsgCont' style={badPeriod && loaded ? {} : {display: 'none'}} >
          <p className='trendMsg'>Insufficient data for this time period.</p>
        </div>

      </div>

    </div>
  );
}
