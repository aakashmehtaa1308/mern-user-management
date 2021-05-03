import React, { useEffect, useState } from 'react';
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

  const GetCurrentKey = () => {
    if (history.location.pathname === '/') {
      return ['1'];
    } else if (history.location.pathname === '/signup') {
      return ['3'];
    } else if (history.location.pathname === '/signin') {
      return ['4'];
    } else if (history.location.pathname === '/users') {
      return ['5'];
    } else if (history.location.pathname === '/users/myprofile') {
      return ['6'];
    }
  };

  return (
    <div>
      <Menu
        className='navbar-nav'
        mode='horizontal'
        defaultSelectedKeys={GetCurrentKey()}
      >
        <nobr className='navbar-nav-brand'>MERN Auth</nobr>
        <Menu.Item
          key='1'
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
            key='2'
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
            Sign out
          </Menu.Item>
        )}

        {!state.isAuthenticated && (
          <Menu.Item
            key='3'
            className='navbar-nav-link navbar-nav-link-right'
            icon={<UsergroupAddOutlined />}
            onClick={() => history.push(`/signup`)}
          >
            Sign up
          </Menu.Item>
        )}

        {!state.isAuthenticated && (
          <Menu.Item
            key='4'
            className='navbar-nav-link navbar-nav-link-right'
            icon={<UserAddOutlined />}
            onClick={() => history.push(`/signin`)}
          >
            Sign in
          </Menu.Item>
        )}

        {state.isAuthenticated && (
          <Menu.Item
            key='5'
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
            Users
          </Menu.Item>
        )}
        {state.isAuthenticated && (
          <Menu.Item
            key='6'
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
                history.push(`/users/myprofile`);
              }
            }}
          >
            Profile
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
