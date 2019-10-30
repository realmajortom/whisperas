import React from 'react';

const styles = {
  h1: {
    textAlign: 'center',
    fontSize: '40px',
    fontFamily: 'Metropolis, sans-serif',
    margin: 0
  },
  h2: {
    textAlign: 'center',
    fontSize: '30px',
    fontFamily: 'Metropolis, sans-serif'
  },
  p: {
    textAlign: 'center',
    fontSize: '24px',
    fontFamily: 'Inter var, sans-serif',
    margin: '0 5vw'
  },
  p2: {
    textAlign: 'center',
    fontSize: '24px',
    fontFamily: 'Inter var, sans-serif',
    margin: '20px 5vw'
  }
};

export default function Snapp() {
  return (
    <div>
      <h1 style={styles.h1}>Whisperas: The Pancreas Whisperer</h1>

      <h2 style={styles.h2}>Discover trends in your daily diabetes health</h2>

      <p style={styles.p}>Whisperas is a portable web app designed for your mobile device.<br />Please go to https://whisperas.com on your phone to experience The Pancreas Whisperer.</p>

      <p style={styles.p2}>A desktop client is in development!</p>

    </div>
  )
};