import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Axios } from '../../Helpers';
import {
  Card,
  notification,
  Divider,
  Row,
  Col,
  Modal,
  Input,
  Skeleton,
} from 'antd';
import { UserOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import './styles.css';
import Form from 'antd/lib/form/Form';

/**
 * @author
 * @function Profile
 **/

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const userId = history.location.search.split('=')[1];
    Axios.get(`/api/users/${userId}`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
      .then((data) => {
        setUser(data.data.user);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className='profile-comp'>
      {!user ? (
        <Skeleton />
      ) : (
        <Card className='profile-card'>
          <div className='profile-card-heading'>
            <span className='profile-card-heading-name'>{`${user.firstName} ${user.lastName}`}</span>
          </div>
          <Divider />
          <Row className='profile-items-row' gutter={[0, 16]} align='middle'>
            <Col span={16}>
              <div className='profile-col-1-username'>
                <UserOutlined className='profile-col-1-avatar' />{' '}
                {user.username}
              </div>

              <div className='profile-col-1-email'>{user.email}</div>
            </Col>
          </Row>
          <Divider />
          <div className='profile-user-joined'>
            Joined: {user.createdAt.split('T')[0]}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Profile;
