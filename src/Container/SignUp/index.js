import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Card, Divider, Row, Col, notification } from 'antd';
import './styles.css';
import { UsergroupAddOutlined } from '@ant-design/icons';
import CustomButton from '../../Components/Layouts/CustomButton';
import { Axios } from '../../Helpers';

/**
 * @author
 * @function SignUp
 **/

const SignUp = (props) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const history = useHistory();

  useEffect(() => {
    document.querySelector('body').classList.add('auth-background-color');
    document.title = `Sign up`;
    return () => {
      document.querySelector('body').classList.remove('auth-background-color');
      document.title = `User Management`;
    };
  }, []);

  const OnRefresh = () => {
    setFirstName(null);
    setLastName(null);
    setEmail(null);
    setPassword(null);
    setConfirmPassword(null);
    setUsername(null);
  };

  const checkValidation = () => {
    if (!firstName) {
      notification['error']({
        message: `First name is required.`,
        description: `The first name is a must to be a user.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return false;
    }
    if (!lastName) {
      notification['error']({
        message: `Last name is required.`,
        description: `The last name is a must to be a user.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return false;
    }
    if (!email) {
      notification['error']({
        message: `E-mail is required.`,
        description: `The email is a must to be a user.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return false;
    }
    if (!password) {
      notification['error']({
        message: `Password is required.`,
        description: `The password is a must to be a user.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return false;
    }
    if (!confirmPassword) {
      notification['error']({
        message: `Confirm password is required.`,
        description: `The confirm password is a must to be a user.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return false;
    }
    if (!username) {
      notification['error']({
        message: `Username is required.`,
        description: `The username is a must to be a user.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return false;
    }
    if (password !== confirmPassword) {
      notification['error']({
        message: `Password mismatch occurred.`,
        description: `The password and confirm password you enter, doesn't match. Please enter carefully.`,
        placement: 'bottomRight',
        duration: 3,
      });
      return false;
    }
    return true;
  };

  const OnSignUp = () => {
    if (!checkValidation()) {
      return;
    }
    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      username,
    };

    Axios.post('/api/users/signup', user)
      .then((data) => {
        notification['success']({
          message: data.data.message,
          description: `You are signed up successfully. You can sign-in now.`,
          placement: 'bottomRight',
          duration: 5,
        });
        OnRefresh();
        history.push('/');
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
              <UsergroupAddOutlined className='auth-icon' />
            </Col>
            <Col>
              <div className='signin-card-head-1'>Welcoming You!</div>
              <div className='signin-card-head-2'>Create a new account</div>
            </Col>
          </Row>
          <Divider />
          <Form
            onFinish={OnSignUp}
            onFinishFailed={() => {
              console.log('failed');
            }}
          >
            <Form.Item
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}
            >
              <Input
                value={firstName}
                placeholder='First Name'
                bordered={false}
                className='auth-form-input'
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: `Please input your last name!. If you don't have last name, enter dot(.).`,
                },
              ]}
            >
              <Input
                placeholder='Last Name'
                bordered={false}
                className='auth-form-input'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Form.Item>
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
                placeholder='E-mail'
                bordered={false}
                className='auth-form-input'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                placeholder='Password'
                bordered={false}
                className='auth-form-input'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please input your confirm Password!',
                },
              ]}
            >
              <Input.Password
                placeholder='Confirm Password'
                bordered={false}
                className='auth-form-input'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input
                placeholder='Username'
                bordered={false}
                className='auth-form-input'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Item>
            <Divider />
            <Form.Item>
              <Row justify='space-between'>
                <Col>
                  <CustomButton placeholder={`SIGN UP`} />
                </Col>

                <Col>
                  <div className='auth-tagline'>
                    Be patient. Your information is safe with us.
                  </div>
                  <div className='auth-change-tagline'>
                    Already a User ?{' '}
                    <a
                      onClick={() => {
                        history.push('signin');
                      }}
                    >
                      Log in to your account.
                    </a>
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

export default SignUp;
