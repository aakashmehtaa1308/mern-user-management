import React from 'react';
import { Row, Col, Button } from 'antd';
import { useHistory } from 'react-router';
import './styles.css';

/**
 * @author
 * @function index
 **/

const ErrorPage = (props) => {
  const history = useHistory();
  return (
    <div className='error-page'>
      <Row justify='center' align='middle'>
        <Col className='error-col-1'>
          <h1 className='error-smile'> : ( </h1>
        </Col>
        <Col className='error-col-2'>
          <h1 className='error-header'>404 - PAGE NOT FOUND </h1>
          <p className='error-para'>
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>
          <Button
            className='error-button'
            onClick={() => {
              history.push('/');
            }}
          >
            GO TO HOME PAGE
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ErrorPage;
