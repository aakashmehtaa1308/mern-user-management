import React, { useState, useEffect } from 'react';
import { Form, Input, Card, Divider, Row, Col, notification } from 'antd';
import './styles.css';
import { UserAddOutlined } from '@ant-design/icons';
import CustomButton from '../../Components/Layouts/CustomButton';
import { Axios } from '../../Helpers';
import { useHistory } from 'react-router';
import { AuthContext } from '../../App';

/**
 * @author
 * @function SignIn
 **/

const SignIn = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();
  const { state, dispatch } = React.useContext(AuthContext);

  useEffect(() => {
    document.querySelector('body').classList.add('auth-background-color');
    document.title = `Sign in`;
    return () => {
      document.querySelector('body').classList.remove('auth-background-color');
      document.title = `User Management`;
    };
  }, []);

  const checkValidation = () => {
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
    return true;
  };

  const OnSubmit = () => {
    if (!checkValidation()) {
      return;
    }
    const user = {
      email,
      password,
    };
    if (state.isAuthenticated) {
      notification['success']({
        message: 'Signed in.',
        description: `You are already signed in.`,
        placement: 'bottomRight',
        duration: 5,
      });
      return;
    }
    Axios.post('/auth/signin', user)
      .then((data) => {
        notification['success']({
          message: data.data.message,
          description: `You are signed in successfully.`,
          placement: 'bottomRight',
          duration: 5,
        });
        dispatch({
          type: 'SIGNIN',
          payload: {
            user: data.data.user,
            token: data.data.token,
          },
        });
        // for sign-out after token expires...////////////////
        setTimeout(() => {
          notification['error']({
            message: 'Time-out',
            description: 'Your session was timed out. Please sign-in again.',
            placement: 'bottomRight',
            duration: 5,
          });
          dispatch({
            type: 'SIGNOUT',
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }, 3600000);
        ///////////////////////////////////////////////

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
              <UserAddOutlined className='auth-icon' />
            </Col>
            <Col>
              <div className='signin-card-head-1'>Welcome back!</div>
              <div className='signin-card-head-2'>Sign In to your account</div>
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

            <Form.Item
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                bordered={false}
                className='auth-form-input'
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Divider />

            <Form.Item>
              <Row justify='space-between' gutter={[0, 32]}>
                <Col>
                  <CustomButton placeholder={`SIGN IN`} />
                </Col>
                <Col>
                  <div className='auth-tagline'>
                    Be patient. Your information is safe with us.
                  </div>
                  <div className='auth-change-tagline'>
                    Doesn't have account ?
                    <a
                      onClick={() => {
                        history.push('/signup');
                      }}
                    >
                      Create an account
                    </a>
                  </div>
                  <div className='auth-change-tagline'>
                    Don't remember the password ?
                    <a
                      onClick={() => {
                        history.push('/users/forgot-password');
                      }}
                    >
                      Forgot Password
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

export default SignIn;
