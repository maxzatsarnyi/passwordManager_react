import React from 'react';
import { AuthForm } from '../components/AuthForm/AuthForm';

const Login = () => {
  return (
    <div className='signup'>
      <div className='signup__form'>
        <AuthForm isSignup onSubmit={() => console.log('SUBMIT')} />
      </div>
    </div>
  );
};

export default Login;
