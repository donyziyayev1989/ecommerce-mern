/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { LockIcon, SignInIcon, UserIcon, MailIcon } from '../../assets/icons';
import { useSelector } from 'react-redux';
import { toggleMember } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import FormGroup from './../form/FormGroup';
import Button from '../Button';

const OffcanvasAccount = () => {
  const { isMember } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <>
      <ul className='nav nav-tabs nav-justified' role='tablist'>
        <li className='nav-item'>
          <a
            className={`${!isMember ? 'nav-link active' : 'nav-link'}`}
            hrev='#'
            onClick={() => dispatch(toggleMember(false))}
          >
            <SignInIcon /> Sign In
          </a>
        </li>
        <li className='nav-item'>
          <a
            className={`${isMember ? 'nav-link active' : 'nav-link'}`}
            hrev='#'
            onClick={(e) => dispatch(toggleMember(true))}
          >
            <UserIcon /> Sign Up
          </a>
        </li>
      </ul>
      <div className='tab-content pt-1'>
        {!isMember && (
          <div
            className='tab-pane fade active show'
            id='signin'
            role='tabpanel'
          >
            <form className='needs-validation' noValidate=''>
              <div className='form-group'>
                <label className='sr-only' htmlFor='signin-email'>
                  Email
                </label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text' id='signin-email-icon'>
                      <MailIcon />
                    </span>
                  </div>
                  <input
                    className='form-control'
                    type='email'
                    id='signin-email'
                    placeholder='Email'
                    aria-label='Email'
                    aria-describedby='signin-email-icon'
                    required=''
                  />
                  <div className='invalid-feedback'>
                    Please provide email address.
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <label className='sr-only' htmlFor='signin-password'>
                  Password
                </label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      id='signin-password-icon'
                    >
                      <LockIcon />
                    </span>
                  </div>
                  <input
                    className='form-control'
                    type='password'
                    id='signin-password'
                    placeholder='Password'
                    aria-label='Password'
                    aria-describedby='signin-password-icon'
                    required=''
                  />
                  <div className='invalid-feedback'>
                    Please enter a password.
                  </div>
                </div>
              </div>
              <div className='custom-control custom-checkbox mb-3'>
                <input
                  className='custom-control-input'
                  type='checkbox'
                  id='remember-me'
                />
                <label className='custom-control-label' htmlFor='remember-me'>
                  Remember me
                </label>
              </div>
              <button className='btn btn-primary btn-block' type='submit'>
                Sign In
              </button>
            </form>
          </div>
        )}

        {isMember && (
          <div
            className='tab-pane fade active show'
            id='signup'
            role='tabpanel'
          >
            <form className='needs-validation' noValidate=''>
              <FormGroup
                name='signup-name'
                type='text'
                placeholder='Full name'
                label='Full name'
                required
                feedback=''
                srcOnly
              />

              <FormGroup
                name='signup-email'
                type='email'
                placeholder='Email address'
                label='Email address'
                required
                feedback=''
                srcOnly
              />

              <FormGroup
                name='signup-password'
                type='password'
                placeholder='Password'
                label='Password'
                required
                feedback=''
                srcOnly
              />

              <FormGroup
                name='signup-password-confirm'
                type='password'
                placeholder='Confirm password'
                label='Confirm password'
                required
                feedback=''
                srcOnly
              />

              <Button type='submit' block>
                Sign Up
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default OffcanvasAccount;
