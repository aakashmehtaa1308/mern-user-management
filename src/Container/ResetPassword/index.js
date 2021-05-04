import React, { useState, useEffect } from 'react';
import { Form, Input, Card, Divider, Row, Col, notification } from 'antd';
import CustomButton from '../../Components/Layouts/CustomButton';
import { Axios } from '../../Helpers';
import { useHistory } from 'react-router';

/**
 * @author
 * @function ResetPassword
 **/

const ResetPassword = (props) => {
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const history = useHistory();
  const OnSubmit = () => {
    if (!password) {
      notification['error']({
        message: `Password is required.`,
        description: `Please enter your password.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return;
    }
    if (!confirmPassword) {
      notification['error']({
        message: `Confirm Password is required.`,
        description: `You have not confirm your password.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return;
    }
    if (password !== confirmPassword) {
      notification['error']({
        message: `Password didn't match.`,
        description: `Please enter same password in both the fields.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return;
    }
    const userId = history.location.search.split('=')[1];
    Axios.put(`api/users/reset-password/${userId}`, {
      password,
      confirmPassword,
    })
      .then((data) => {
        // console.log(data);
        notification['success']({
          message: `Your password has been reset successfully.`,
          description: `Now, you can sign-in again and access your account.`,
          placement: 'bottomRight',
          duration: 5,
        });
        history.push('/signin');
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
              <div className='signin-card-head-1'>Reset Your Password!</div>
              <div className='signin-card-head-2'>
                Set your new password here.
              </div>
            </Col>
          </Row>
          <Divider />
          <Form onFinish={OnSubmit}>
            <Form.Item
              rules={[
                {
                  type: 'password',
                  message: 'The input is not valid Password!',
                },
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                bordered={false}
                className='auth-form-input'
                placeholder='New Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  type: 'password',
                  message: 'The input is not valid Password!',
                },
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                bordered={false}
                className='auth-form-input'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
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
                    Enter your Password in the above fields, you want to store.
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

export default ResetPassword;
