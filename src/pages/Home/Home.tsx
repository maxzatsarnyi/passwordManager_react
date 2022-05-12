import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../../AuthContext';
import { Accounts } from '../../components/Accounts/Accounts';
import './_home.scss';

const Home = () => {
  const { token } = AuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <div className='home'>
      <div className='container'>
        <h1>Hello, it{`'`}s your Dashboard!</h1>
        <p className='home__desc'>
          Go beyond saving passwords with the best password manager! <br></br>{' '}
          Generate strong passwords and store them in a secure vault.
        </p>
        <div className='home__accounts'>
          <Accounts />
        </div>
      </div>
    </div>
  );
};

export default Home;
