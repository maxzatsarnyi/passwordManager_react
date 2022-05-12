import {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react';
import { Token } from './entities/index';

type Props = {
  children: JSX.Element;
};

type User = {
  email: string | null;
};

interface IContext {
  token: Token;
  user: { email: string | null };
  setToken: Dispatch<SetStateAction<Token>>;
  setUser: Dispatch<SetStateAction<User>>;
}

const Auth = createContext<IContext>(null!);

const AuthContext: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<Token>(
    sessionStorage.getItem('pm-access-token')
      ? sessionStorage.getItem('pm-access-token')
      : null
  );
  const [user, setUser] = useState<User>({ email: null });

  return (
    <Auth.Provider value={{ token, user, setToken, setUser }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;

export const AuthState = () => {
  return useContext(Auth);
};
