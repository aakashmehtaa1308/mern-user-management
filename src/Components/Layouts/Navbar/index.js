import React, { useState } from 'react';
import { Menu, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../App';
import {
  HomeFilled,
  UserAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import './styles.css';

/**
* @author
* @function Navbar

**/

const Navbar = (props) => {
  let history = useHistory();
  const { state, dispatch } = React.useContext(AuthContext);

  return (
    <div>
      <Menu className='navbar-nav' mode='horizontal'>
        <nobr className='navbar-nav-brand'>USER Management</nobr>
        <Menu.Item
          className='navbar-nav-link navbar-nav-link-left'
          icon={<HomeFilled />}
          onClick={() => {
            if (!state.isAuthenticated) {
              notification['warning']({
                message: `Sign-in first.`,
                description: `You have to sign-in first to access this page .`,
                placement: 'bottomRight',
                duration: 5,
              });
            } else {
              history.push(`/`);
            }
          }}
        ></Menu.Item>

        {state.isAuthenticated && (
          <Menu.Item
            className='navbar-nav-link navbar-nav-link-right'
            onClick={() => {
              dispatch({
                type: 'SIGNOUT',
              });
              notification['success']({
                message: `Signed out.`,
                description: `You are signed out successfully.`,
                placement: 'bottomRight',
                duration: 3,
              });
            }}
          >
            SIGN OUT
          </Menu.Item>
        )}

        {!state.isAuthenticated && (
          <Menu.Item
            className='navbar-nav-link navbar-nav-link-right'
            icon={<UsergroupAddOutlined />}
            onClick={() => history.push(`/signup`)}
          >
            SIGN UP
          </Menu.Item>
        )}

        {!state.isAuthenticated && (
          <Menu.Item
            className='navbar-nav-link navbar-nav-link-right'
            icon={<UserAddOutlined />}
            onClick={() => history.push(`/signin`)}
          >
            SIGN IN
          </Menu.Item>
        )}

        {state.isAuthenticated && (
          <Menu.Item
            className='navbar-nav-link navbar-nav-link-right'
            icon={<UserOutlined />}
            onClick={() => {
              if (!state.isAuthenticated) {
                notification['warning']({
                  message: `Sign-in first.`,
                  description: `You have to sign-in first to access this page .`,
                  placement: 'bottomRight',
                  duration: 5,
                });
              } else {
                history.push('/users');
              }
            }}
          >
            USERS
          </Menu.Item>
        )}
        {state.isAuthenticated && (
          <Menu.Item
            className='navbar-nav-link navbar-nav-link-right'
            icon={<UserOutlined />}
            onClick={() => {
              if (!state.isAuthenticated) {
                notification['warning']({
                  message: `Sign-in first.`,
                  description: `You have to sign-in first to access this page .`,
                  placement: 'bottomRight',
                  duration: 5,
                });
              } else {
                console.log(JSON.parse(localStorage.getItem('user'))._id);
                history.push(
                  `/profile/users?userId=${
                    JSON.parse(localStorage.getItem('user'))._id
                  }`
                );
              }
            }}
          >
            PROFILE
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default Navbar;

//0d47a1
//0099CC
//00695c
