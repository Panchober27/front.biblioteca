import React from 'react';
import { Link } from 'react-router-dom';
import TopbarProfile from '../components/topbar/TopbarProfile';
import TopbarNav from './tobar_nav/TopbarNav';

const TopbarWithNavigation = () => (
  <div className='topbar topbar--navigation'>
    <div className='topbar__left'>
      <Link className='topbar__logo' to='/home' />
    </div>
    <TopbarNav />
    <div className='topbar__right'>
      <div className='topbar__right-over'>
        <TopbarProfile />
      </div>
    </div>
  </div>
);

export default TopbarWithNavigation;
