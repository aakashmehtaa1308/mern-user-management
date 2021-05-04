import React, { useEffect } from 'react';
import { Card } from 'antd';
import './styles.css';

import HomeImage from '../../Images/nature.jpg';

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  useEffect(() => {
    document.title = `home`;
    return () => {
      document.title = `User Management`;
    };
  }, []);
  return (
    <div>
      <Card className='home-card'>
        <div className='home-card-heading'>HOME</div>
        <div>
          <img src={HomeImage} className='home-card-image'></img>
          <div className='home-card-footer'>Home page for this website.</div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
