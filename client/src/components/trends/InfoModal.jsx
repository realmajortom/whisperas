import React from 'react';
import {Modal} from 'antd';

export default function InfoModal() {
  Modal.info({
    title: 'Trend Calculations',
    centered: true,
    maskClosable: true,
    maskStyle: {backgroundColor: 'rgba(0,0,0,.7)'},
    content: (
      <div className='Modal'>
        <p>The selected time period determines how many recent entries to include in the trend calculations, so missing days are ignored.</p>
        <p>When making an entry, each of the emojis corresponds to a score between 1 & 5. An average of those scores is used to pick the emojis shown here.</p>
        <p>The items listed under Wins, Setbacks, and Treatment Changes are the most frequently occuring selections in their respective categories.</p>
        <p>To pick your best and worst days an average score is calculated for each day of the week; the 7 averages are then sorted to find the highest and lowest scoring days.</p>
      </div>
    ),
    onOk() {}
  });
}