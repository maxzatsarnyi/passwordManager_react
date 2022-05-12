import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../AuthContext';
import { AuthForm } from '../components/AuthForm/AuthForm';
import { IAuthData } from '../entities';
import axiosInstance from '../config/axios';
import axios from 'axios';
import requests from '../config/requests';
import { toast } from 'react-toastify';

export type AuthResponse = {
  data: { _id: string };
  message: string;
  status: string;
};

const Signup = () => {
  const { token, setToken } = AuthState();
  const [error, setError] = useState({
    isError: false,
    text: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const handleSubmit = async (reqData: IAuthData) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>(
        requests.signup,
        reqData
      );
      if (data.status === 'FAILED') {
        const { message } = data;
        setError({
          isError: true,
          text: message,
        });
        toast.error(message);
      } else if (data.status === 'SUCCESS') {
        setError({
          isError: false,
          text: '',
        });
        toast.success('Successfully');
        const token = data.data._id;
        sessionStorage.setItem('pm-access-token', token);
        setToken(token);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occured';
      }
    }
  };

  return (
    <div className='signup'>
      <div className='signup__form'>
        <AuthForm
          error={error}
          setError={setError}
          isSignup
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Signup;
