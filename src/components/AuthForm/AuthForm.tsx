import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ErrorType } from '../../entities';
import './_authform.scss';

type Props = {
  isSignup?: boolean;
  onSubmit: (data: any) => void;
  error: ErrorType;
  setError: Dispatch<SetStateAction<ErrorType>>;
};

export const AuthForm: FC<Props> = ({
  isSignup = false,
  onSubmit,
  error,
  setError,
}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isPassVisible, setIsPassVisible] = useState({
    password: false,
    confirmPassword: false,
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
    const { email, password, confirmPassword } = data;
    if (password.length < 6) {
      setError({
        isError: true,
        text: 'The password too short',
      });
      toast.error('The password too short');
      return;
    }
    if (password !== confirmPassword && isSignup) {
      setError({
        isError: true,
        text: 'The password and confirm password fields do not match',
      });
      toast.error('The password and confirm password fields do not match');
    } else {
      setError({
        isError: false,
        text: '',
      });
      onSubmit({ email, password });
    }
  };

  return (
    <form className='authform' onSubmit={handleSubmit}>
      <h2 className='authform__title'>Password Manager</h2>
      <p className='authform__undertitle'>Welcome</p>
      <p className='authform__desc'>
        {isSignup ? 'Sign Up to continue' : 'Log In to continue'}
      </p>
      <div className='authform__label'>
        <input
          name='email'
          value={data.email}
          onChange={handleChange}
          type='text'
          className='authform__input'
          placeholder='Email address'
        />
      </div>
      <div className='authform__label'>
        <input
          name='password'
          value={data.password}
          onChange={handleChange}
          type={isPassVisible.password ? 'text' : 'password'}
          className={`authform__input ${
            error.isError && 'authform__input--notvalid'
          }`}
          placeholder='Password'
        />
        {isPassVisible.password ? (
          <AiOutlineEyeInvisible
            className='authform__eye-icon'
            size={28}
            onClick={() =>
              setIsPassVisible((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
          />
        ) : (
          <AiOutlineEye
            className='authform__eye-icon'
            size={28}
            onClick={() =>
              setIsPassVisible((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
          />
        )}
      </div>
      {isSignup && (
        <div className='authform__label'>
          <input
            name='confirmPassword'
            value={data.confirmPassword}
            onChange={handleChange}
            type={isPassVisible.confirmPassword ? 'text' : 'password'}
            className={`authform__input ${
              error.isError && 'authform__input--notvalid'
            }`}
            placeholder='Confirm password'
          />
          {isPassVisible.confirmPassword ? (
            <AiOutlineEyeInvisible
              className='authform__eye-icon'
              size={28}
              onClick={() =>
                setIsPassVisible((prev) => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                }))
              }
            />
          ) : (
            <AiOutlineEye
              className='authform__eye-icon'
              size={28}
              onClick={() =>
                setIsPassVisible((prev) => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                }))
              }
            />
          )}
        </div>
      )}
      <button type='submit'>Continue</button>
      <div className={`authform__error ${error.isError && 'error'}`}>
        {error.text}
      </div>
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
