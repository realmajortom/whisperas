import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {message} from 'antd';
import axios from 'axios';

import SwipeableViews from 'react-swipeable-views';
import Card0 from './Card0';
import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';
import Card4 from './Card4';
import Card5 from './Card5';



export default function EntryPage(props) {

  const user = localStorage.getItem('prefname');

  const [wins, setWins] = useState([]);
  const [comment, setComment] = useState('');
  const [setbacks, setSetbacks] = useState([]);
  const [genScore, setGenScore] = useState(null);
  const [invalid0, setInvalid0] = useState(false);
  const [invalid1, setInvalid1] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [healthScore, setHealthScore] = useState(null);
  const [treatChanges, setTreatChanges] = useState([]);


  const updateIndex = i => {
    props.setIndex(i);
  };
  

  const clearAll = () => {
    setWins([]);
    setComment([]);
    setSetbacks([]);
    setGenScore([]);
    setInvalid0(false);
    setInvalid1(false);
    setHealthScore(null);
    setTreatChanges([]);
    updateIndex(0);
    setRedirect(true);
  };


  const submit = () => {

    const token = localStorage.getItem('token');
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDay();

    if (token !== null) {
      axios.post('http://192.168.1.111:8080/journal/submit', {
        dmy: `${date}-${month}-${year}`,
        date: date,
        month: month,
        year: year,
        day: day,
        genScore: genScore,
        healthScore: healthScore,
        wins: wins,
        setbacks: setbacks,
        treatChanges: treatChanges,
        comment: comment
      },
      {headers: {Authorization: `JWT ${token}`}})
        .then(res => {
          if (res.data.success || res.data.code === 1) {
            message.success(res.data.message);
            clearAll();
          } else {
            message.error(res.data.message);
            updateIndex(0);
          }
        });
    } else {
      message.error('Please login to continue!');
      clearAll();
    }
  };


  const validateEntry = () => {
    if (genScore === null && healthScore === null) {
      message.warning('Woops! The first 2 questions cannot be left blank :)');
      setInvalid0(true);
      setInvalid1(true);
      updateIndex(0);
    } else if (genScore === null) {
      message.warning('Please answer the first question :)');
      setInvalid0(true);
      updateIndex(0);
    } else if (healthScore === null) {
      alert('Please answer the second question :)');
      message.warning('Please answer the second question :)');
      setInvalid1(true);
      updateIndex(1);
    } else {
      submit();
    }
  };


  if (redirect) {
    return (
      <Redirect push to='/' />
    );
  } else {
    return (
      <div className='mainPage EntryPage'>

        {/*NOTE: The following div was originally a form element, but I switched it bc Chrome on Android was causing the swipeable container to jump to random areas when clicking the 'Enter' key in an input field. Since it's an issue with form autocompletion, removing the form entirely "fixes" the issue :/   */}
        <div className='entryForm'>

          <SwipeableViews enableMouseEvents index={props.index} onChangeIndex={updateIndex} >

            <Card0 res={genScore} setRes={setGenScore} user={user} invalid={invalid0} setInval={setInvalid0} />
            <Card1 res={healthScore} setRes={setHealthScore} genScore={genScore} invalid={invalid1} setInval={setInvalid1} />
            <Card2 res={wins} setRes={setWins} />
            <Card3 res={setbacks} setRes={setSetbacks} />
            <Card4 res={treatChanges} setRes={setTreatChanges} />
            <Card5 res={comment} setRes={setComment} />

          </SwipeableViews>

        </div>

        <div id='hiddenBtn' style={props.index === 5 ? {display: 'block'} : {}} onClick={() => validateEntry()}></div>

      </div>

    );
  }

}