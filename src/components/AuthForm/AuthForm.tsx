import React, { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './_authform.scss';

type Props = { isSignup?: boolean; onSubmit: () => void };
export const AuthForm: FC<Props> = ({ isSignup = false, onSubmit }) => {
  const [data, setData] = useState({
    login: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // onSubmit();
  };

  return (
    <form className='authform' onSubmit={handleSubmit}>
      <h2 className='authform__title'>Password Manager</h2>
      <p className='authform__undertitle'>Welcome</p>
      <p className='authform__desc'>
        {isSignup ? 'Sign Up to continue' : 'Log In to continue'}
      </p>
      <input
        name='login'
        value={data.login}
        onChange={handleChange}
        type='text'
        className='authform__input'
        placeholder='Email address'
      />
      <input
        name='password'
        value={data.password}
        onChange={handleChange}
        type='text'
        className='authform__input'
        placeholder='Password'
      />
      {isSignup && (
        <input
          name='confirmPassword'
          value={data.confirmPassword}
          onChange={handleChange}
          type='text'
          className='authform__input'
          placeholder='Confirm password'
        />
      )}
      <button type='submit'>Continue</button>
      <p className='authform__redirect'>
        {isSignup ? (
          <span>
            Already have an account? <Link to={`/login`}>Log in</Link>
          </span>
        ) : (
          <span>
            Don{`'`}t have an account? <Link to={`/signup`}>Sign up</Link>
          </span>
        )}
      </p>
    </form>
  );
};
