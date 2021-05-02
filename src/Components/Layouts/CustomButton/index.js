import React from 'react';
import { Button } from 'antd';
import './styles.css';
/**
 * @author
 * @function CustomButton
 **/

const CustomButton = (props) => {
  return (
    <div>
      <Button className='signup-btn' type='primary' htmlType='submit'>
        {props.placeholder}
      </Button>
    </div>
  );
};

export default CustomButton;
