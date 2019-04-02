import { createContext } from 'react';

const UserContext = createContext({
  isLogIn: false,
  username: '',
  login: () => { },
  logout: () => { },
});

export const { Provider, Consumer } = UserContext;
