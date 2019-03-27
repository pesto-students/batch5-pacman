import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Button } from '@material-ui/core';
import NavBar from '../NavBar';

const createProps = ({
  userContext = {}, classes = {},
}) => ({
  userContext, classes,
});

let wrapper; let props; let shallow;

beforeEach(() => {
  props = createProps({});
  shallow = createShallow({ dive: true });
  wrapper = shallow(<NavBar {...props} />);
});

describe('<NavBar />', () => {
  it('should exist', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render', () => {
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should render the pacman label', () => {
    expect(wrapper.contains('PacMan Pro')).toBe(true);
  });

  it('should not contain Leader Board if not logged in', () => {
    expect(wrapper.contains('Leader Board')).toBe(false);
  });

  it('should contain Leader Board button if logged in', () => {
    props = createProps({ userContext: { isLogIn: true } });
    wrapper = shallow(<NavBar {...props} />);
    expect(wrapper.find(Button).length).toBe(1);
    expect(wrapper.contains('Leader Board')).toBe(true);
  });

  it('should contain username if logged in', () => {
    const username = 'Mohd Hassaan';
    props = createProps({ userContext: { isLogIn: true, username } });
    wrapper = shallow(<NavBar {...props} />);
    expect(wrapper.contains(username)).toBe(true);
  });

  it('test check', () => {
    expect(true).toBe(true);
  });
});
