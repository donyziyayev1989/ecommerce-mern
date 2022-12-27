/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { LockIcon, SignInIcon, UserIcon, MailIcon } from '../../assets/icons';
import { useSelector } from 'react-redux';
import {
  loginUser,
  registerUser,
  toggleMember,
} from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import FormGroup from '../form/FormGroup';
import Button from '../Button';
import InputGroup from '../form/InputGroup';
import Checkbox from '../form/Checkbox';
import { useState } from 'react';
const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  isMember: false,
  rememberMe: false,
};

const OffcanvasAccount = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    let value;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    setValues({ ...values, [name]: value });
  };

  const toggleMember = (value) => {
    setValues({ ...values, isMember: value });
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, passwordConfirm, isMember } = values;
    if (!isMember && (!email || !password || !name || !passwordConfirm)) {
      console.error('PLease fill out all the fields');
    }
    dispatch(registerUser({ name, email, password }));
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    const { email, password, isMember, rememberMe } = values;
    if (isMember && (!email || !password)) {
      console.error('PLease fill out all the fields');
    }
    dispatch(loginUser({ email, password, rememberMe }));
  };
  return (
    <>
      <ul className='nav nav-tabs nav-justified' role='tablist'>
        <li className='nav-item'>
          <a
            className={`${!values.isMember ? 'nav-link active' : 'nav-link'}`}
            hrev='#'
            onClick={() => toggleMember(false)}
          >
            <SignInIcon /> Sign In
          </a>
        </li>
        <li className='nav-item'>
          <a
            className={`${values.isMember ? 'nav-link active' : 'nav-link'}`}
            hrev='#'
            onClick={(e) => toggleMember(true)}
          >
            <UserIcon /> Sign Up
          </a>
        </li>
      </ul>

      <div className='tab-content pt-1'>
        {!values.isMember && (
          <div className='tab-pane fade active show' id='signin'>
            <form className='needs-validation' onSubmit={loginSubmit}>
              <InputGroup
                type='email'
                name='email'
                placeholder='Email'
                label='Email'
                required
                icon={<MailIcon />}
              />

              <InputGroup
                type='password'
                name='password'
                placeholder='Password'
                label='Password'
                required
                icon={<LockIcon />}
              />
              <Checkbox
                name='rememberMe'
                label='Remember me'
                checked={values.rememberMe}
                onChange={handleChange}
                classes='mb-3'
              />

              <Button type='submit' block>
                Sign In
              </Button>
            </form>
          </div>
        )}

        {values.isMember && (
          <div className='tab-pane fade active show' id='signup'>
            <form className='needs-validation' onSubmit={registerSubmit}>
              <FormGroup
                name='name'
                type='text'
                value={values.name}
                handleChange={handleChange}
                placeholder='Full name'
                label='Full name'
                required
                feedback=''
                srcOnly
              />

              <FormGroup
                name='email'
                type='email'
                value={values.email}
                handleChange={handleChange}
                placeholder='Email address'
                label='Email address'
                required
                feedback=''
                srcOnly
              />

              <FormGroup
                name='password'
                type='password'
                value={values.password}
                handleChange={handleChange}
                placeholder='Password'
                label='Password'
                required
                feedback=''
                srcOnly
              />

              <FormGroup
                name='passwordConfirm'
                type='password'
                value={values.passwordConfirm}
                handleChange={handleChange}
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
