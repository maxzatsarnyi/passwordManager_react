import { Link } from 'react-router-dom';
import './_nav.scss';
import { FiLogOut } from 'react-icons/fi';
import { AuthState } from '../../AuthContext';

export const Nav = () => {
  const { token, setToken } = AuthState();
  const logout = () => {
    sessionStorage.removeItem('pm-access-token');
    setToken(null);
  };
  return (
    <>
      {token ? (
        <div className='header'>
          <Link to='/' className='header__logo'>
            Password Manager
          </Link>
          <FiLogOut size={30} onClick={logout} className='header__logout' />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
