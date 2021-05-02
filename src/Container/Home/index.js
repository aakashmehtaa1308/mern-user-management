import React, { useEffect } from 'react';
import { Card } from 'antd';

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
      <Card>
        <div style={{textAlign:'center', fontFamily:'cursive', fontSize:'1.5rem'}}>HOME</div>
        <div>
          <img style={{ width: '98vw', height: '85vh' }} src={HomeImage}></img>
        </div>
      </Card>
    </div>
  );
};

export default Home;
