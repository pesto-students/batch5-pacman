import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const props = { history: { push: () => { } }, location: { search: '' } };
  shallow(<App {...props} />);
});
