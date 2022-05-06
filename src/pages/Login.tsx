import React from 'react';
import { AuthForm } from '../components/AuthForm/AuthForm';

const Login = () => {
  return (
    <div className='login'>
      <div className='login__form'>
        <AuthForm onSubmit={() => console.log('SUBMIT')} />
      </div>
    </div>
  );
};

export default Login;
