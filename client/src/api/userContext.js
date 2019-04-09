import { createContext } from 'react';

const UserContext = createContext({
  isLogIn: false,
  username: '',
  isGameStarted: false,
  isGameEnd: false,
  score: null,
  isMulti: false,
  login: () => { },
  logout: () => { },
  startMultiPlayerGame: () => { },
  startSinglePlayerGame: () => { },
  setScore: () => { },
  setEndGame: () => { },
  saveScore: () => { },
});

export const { Provider, Consumer } = UserContext;
