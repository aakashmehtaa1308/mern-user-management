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
  const history = useHistory();
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
    Axios.put('api/users/forgot-password', { email: email })
      .then((data) => {
        console.log(data);
        notification['success']({
          message: `Your email has been traced successfully.`,
          description: `Now, you can enter your new password, you want to store.`,
          placement: 'bottomRight',
          duration: 5,
        });
        history.push(`/users/reset-password?userId=${data.data.user._id}`);
      })
      .catch((error) => {
        if (!error.response) {
          notification['error']({
            message: 'Issues in the server.',
            description:
              'There is something wrong with the server, please try after some time',
            placement: 'bottomRight',
            duration: 5,
          });
        } else {
          notification['error']({
            message: error.response.data.message,
            description: error.response.data.error,
            placement: 'bottomRight',
            duration: 5,
          });
        }
      });
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
