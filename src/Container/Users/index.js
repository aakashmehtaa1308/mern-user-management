import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Row, Skeleton, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Axios } from '../../Helpers';
import './styles.css';

/**
 * @author
 * @function Users
 **/

const Users = (props) => {
  const [users, setUsers] = useState(null);
  const history = useHistory();
  useEffect(() => {
    document.title = 'users';
    Axios.get('/api/users', {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
      .then((data) => {
        setUsers(data.data.users);
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
    return () => (document.title = 'User Management');
  }, []);

  let USERS = [];
  if (users) {
    users.map((user) => {
      USERS.push(
        <div key={user._id}>
          <Row
            key-id={user._id}
            className='users-items-row'
            gutter={[0, 16]}
            align='middle'
          >
            <Col span={22}>
              <div className='users-col-1-username'>
                <UserOutlined className='users-col-1-avatar' />{' '}
                {`${user.firstName} ${user.lastName}`}
              </div>
            </Col>
            <Col span={2}>
              <div>
                <ArrowRightOutlined
                  onClick={(e) => {
                    const userId = e.currentTarget.parentNode.parentNode.parentNode.getAttribute(
                      'key-id'
                    );
                    history.push(`/profile/users?userid=${userId}`);
                  }}
                  className='users-col-2-arrow'
                />
              </div>
            </Col>
          </Row>
          <Divider />
        </div>
      );
    });
  }

  return (
    <div className='users-comp'>
      <Card className='users-card'>
        <div className='users-card-heading'>ALL USER</div>
        <Divider />
        {!users ? <Skeleton></Skeleton> : <div>{USERS}</div>}
      </Card>
    </div>
  );
};

export default Users;
