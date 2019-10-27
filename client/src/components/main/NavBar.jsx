import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {MorphIcon} from 'react-svg-buttons';

const navStyle = {
  top: `${window.innerHeight - 50}px`
};

export default function NavBar(props) {

  const index = props.index;
  const location = useLocation().pathname;

  const [morphType, setMorphType] = useState('plus');


  useEffect(() => {
    if (location !== '/entry') {
      setMorphType('plus');
    } else if (index <= 4) {
      setMorphType('fwd');
    } else if (index === 5) {
      setMorphType('check');
    }
  }, [location, index]);


  const handleAddBtn = () => {
    if (index < 5) {
      props.setIndex(index + 1);
    }
  };


  return (
    <div className='NavBar' style={navStyle}>

      <Link to='/history'>
        <img src={require('../../img/nav/cal.svg')} className='navIcn' alt='View History' />
      </Link>

      <Link to='/trends'>
        <img src={require('../../img/nav/trends.svg')} className='navIcn' alt='View Trends' />
      </Link>

      {location !== '/entry' &&
        <Link to='/entry'>
          <div className='navBtn addBtn'>
            <MorphIcon type={morphType} size={75} thickness={5} color="#ffffff" />
          </div>
        </Link>
      }

      {location === '/entry' &&
        <button className='navBtn addBtn' onClick={() => handleAddBtn()}>
          <MorphIcon type={morphType} size={75} thickness={5} color="#ffffff" />
        </button>
      }

      <Link to='/user' >
        <img src={require('../../img/nav/user.svg')} className='navIcn' alt='View User' />
      </Link>

      <Link to='/resources'>
        <img src={require('../../img/nav/link.svg')} className='navIcn' alt='Resources' />
      </Link>


    </div>
  );
}