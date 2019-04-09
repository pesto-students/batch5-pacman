import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const props = {
    history: { push: () => { } },
    location: { search: '' },
    context: { isGameEnd: true, isGameStarted: true, isMulti: true },
  };
  shallow(<App {...props} />);
});
