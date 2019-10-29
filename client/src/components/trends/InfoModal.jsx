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
        <p>The selected time period indicates how many recent entries to included in the calculations. For example, selecting "7 Days" will base trend calculations on the 7 most-recent entries.</p>
        <p>When making an entry, each of the 5 emojis correlates to a  value (or score) between 1 & 5. The Health and General emojis below represent the average scores during the chosen period of time.</p>
        <p>The items listed under Wins, Setbacks, and Treatment Changes are determined by your most frequent selections. All options sharing the same high frequency are listed.</p>
        <p>Best and Worst days are determined by calculating your average entered score for each day of the week, then finding the highest and lowest scoring days.</p>
      </div>
    ),
    onOk() {}
  });
}