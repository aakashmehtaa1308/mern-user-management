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
  useEffect(() => {
    document.querySelector('body').classList.add('auth-background-color');
    document.title = `Sign up`;
    return () => {
      document.querySelector('body').classList.remove('auth-background-color');
      document.title = `User Management`;
    };
  }, []);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();
  const { state, dispatch } = React.useContext(AuthContext);

  const OnRefresh = () => {
    setEmail(null);
    setPassword(null);
  };

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
        history.push('/');
      })
      .catch((error) => {
        notification['error']({
          message: error.response.data.error,
          description: error.response.data.message,
          placement: 'bottomRight',
          duration: 5,
        });
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
                    Doesn't have account ?{' '}
                    <a
                      onClick={() => {
                        history.push('/signup');
                      }}
                    >
                      SIGN UP
                    </a>
                  </div>
                  <div className='auth-change-tagline'>
                    Don't remember the password ?<a href=''>FORGOT PASSWORD</a>
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
