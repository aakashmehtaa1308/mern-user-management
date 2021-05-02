import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Axios } from '../../Helpers';
import { Card, notification, Divider, Row, Col, Modal, Input } from 'antd';
import { UserOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import './styles.css';
import Form from 'antd/lib/form/Form';

/**
 * @author
 * @function Profile
 **/

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const userId = history.location.search.split('=')[1];
    console.log(userId);
    Axios.get(`/api/users/${userId}`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
      .then((data) => {
        setUser(data.data.user);
        setFirstName(data.data.user.firstName);
        setLastName(data.data.user.lastName);
      })
      .catch((error) => {});
  }, []);

  const handleEdit = () => {
    // console.log(firstName, lastName);
    // Axios.put(
    //   `/api/users/update-user/${JSON.parse(localStorage.getItem('user'))._id}`,
    //   {
    //     headers: {
    //       authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    //     },
    //     body: {
    //       firstName: firstName,
    //       lastName: lastName,
    //     },
    //   }
    // )
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
    // setVisibleEditModal(false);
  };

  return (
    <div className='profile-comp'>
      {!user ? (
        <div>USER NOT FOUND</div>
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
            <Col span={4}>
              <div>
                <EditFilled
                  onClick={(e) => {
                    setVisibleEditModal(true);
                  }}
                  className='profile-col-2-arrow'
                />
              </div>
            </Col>
            <Col span={4}>
              <div>
                <DeleteFilled
                  onClick={(e) => {}}
                  className='profile-col-2-arrow'
                />
              </div>
            </Col>
          </Row>
          <Divider />
          <div className='profile-user-joined'>
            Joined: {user.createdAt.split('T')[0]}
          </div>
        </Card>
      )}
      <Modal
        title={<EditFilled className='profile-modal-edit-icon' />}
        visible={visibleEditModal}
        onOk={handleEdit}
        onCancel={() => {
          setVisibleEditModal(false);
        }}
      >
        <Form>
          <Input
            bordered={false}
            className='auth-form-input'
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Input
            bordered={false}
            className='auth-form-input'
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
