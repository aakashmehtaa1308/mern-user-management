import React, { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '../../App';

/**
 * @author
 * @function MyProfile
 **/

const MyProfile = (props) => {
  const [user, setUser] = useState(null);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const history = useHistory();
  const { state, dispatch } = React.useContext(AuthContext);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    setUser(localUser);
    setFirstName(localUser.firstName);
    setLastName(localUser.lastName);
  }, []);

  const handleEdit = () => {
    if (firstName == user.firstName && lastName == user.lastName) {
      notification['success']({
        message: `Already up-to-date.`,
        description: `The credentials you asked to edit is already up-to-date.`,
        placement: 'bottomRight',
        duration: 3,
      });
    }
    Axios.put(
      `/api/users/update-user/${user._id}`,
      {
        firstName,
        lastName,
      },
      {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }
    )
      .then((data) => {
        setUser(data.data.user);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      })
      .catch((error) => {
        notification['error']({
          message: error.response.error,
          description: error.response.message,
          placement: 'bottomRight',
          duration: 3,
        });
      });
    setVisibleEditModal(false);
  };

  const handleDelete = () => {
    console.log('fellow');
    Axios.delete(`/api/users/${user._id}`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    })
      .then((data) => {
        notification['success']({
          message: `Account deleted.`,
          description: `Your account has been deleted successfully.`,
          placement: 'bottomRight',
          duration: 3,
        });
        dispatch({
          type: 'SIGNOUT',
        });
      })
      .catch((error) => {
        notification['error']({
          message: error.response.error,
          description: error.response.message,
          placement: 'bottomRight',
          duration: 3,
        });
      });
    setVisibleDeleteModal(false);
  };

  return (
    <div className='profile-comp'>
      {!user ? (
        <Skeleton></Skeleton>
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
                  onClick={(e) => {
                    setVisibleDeleteModal(true);
                  }}
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
        okText='Submit'
        cancelText='Wait!'
        onOk={handleEdit}
        onCancel={() => {
          setVisibleEditModal(false);
        }}
      >
        <Form>
          <Input
            bordered={false}
            className='auth-form-input'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Input
            bordered={false}
            className='auth-form-input'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Form>
      </Modal>
      {user && (
        <Modal
          title={<DeleteFilled className='profile-modal-edit-icon' />}
          visible={visibleDeleteModal}
          okText='Delete'
          cancelText='Wait!'
          onOk={handleDelete}
          onCancel={() => {
            setVisibleDeleteModal(false);
          }}
        >
          <h3>Warning</h3>
          <p>
            Hey <strong>{user.username},</strong> Are you sure you want delete
            this account ? You will never be able to access this account and all
            your information gets delete, once you delete it.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default MyProfile;
