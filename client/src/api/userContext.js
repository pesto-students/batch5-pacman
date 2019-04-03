import { createContext } from 'react';

const UserContext = createContext({
  isLogIn: false,
  username: '',
  isGameStarted: false,
  login: () => { },
  logout: () => { },
  startMultiPlayerGame: () => { },
  startSinglePlayerGame: () => { },
});

export const { Provider, Consumer } = UserContext;
