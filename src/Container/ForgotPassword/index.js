import React, { useState, useEffect } from 'react';
import { Form, Input, Card, Divider, Row, Col, notification } from 'antd';
import './styles.css';
import { UserAddOutlined } from '@ant-design/icons';
import CustomButton from '../../Components/Layouts/CustomButton';
import { Axios } from '../../Helpers';
import { useHistory } from 'react-router';

/**
 * @author
 * @function ForgotPassword
 **/

const ForgotPassword = (props) => {
  const [email, setEmail] = useState(null);
  const OnSubmit = () => {
    if (!email) {
      notification['error']({
        message: `E-mail is required.`,
        description: `The email is a must to reset your password.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return;
    }
  };
  return (
    <div className='auth-container'>
      <Card className='auth-card'>
        <div className='auth-card-body'>
          <Row justify='space-around'>
            <Col>
              <div className='signin-card-head-1'>Don't Worry!</div>
              <div className='signin-card-head-2'>Your account is safe</div>
            </Col>
          </Row>
          <Divider />
          <Form onFinish={OnSubmit}>
            <Form.Item
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                { required: true, message: 'Please input your e-mail!' },
              ]}
            >
              <Input
                bordered={false}
                className='auth-form-input'
                placeholder='E-mail'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>

            <Divider />

            <Form.Item>
              <Row justify='space-between' gutter={[0, 32]}>
                <Col>
                  <CustomButton placeholder={`Submit`} />
                </Col>
                <Col>
                  <div className='auth-tagline'>
                    Enter your email in the above field to reset your password.
                  </div>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
