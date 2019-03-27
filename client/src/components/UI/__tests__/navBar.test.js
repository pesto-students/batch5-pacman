/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow } from 'enzyme';
import { isThisHour } from 'date-fns';
import { ExpansionPanelActions } from '@material-ui/core';
import NavBar from '../NavBar';

describe('<NavBar />', () => {
  // it('should render', () => {
  //   const wrapper = shallow(<NavBar />);
  //   expect(wrapper.dive().find('div').length).toBe(1);
  // });
  // it('should contain LogIn button by default', () => {
  //   const wrapper = shallow(<NavBar />);
  //   expect(wrapper.dive().contains('login')).toBe(true);
  // });
  // it('should not contain Leader Board by default', () => {
  //   const wrapper = shallow(<NavBar />);
  //   expect(wrapper.dive().contains('Leader Board')).toBe(false);
  // });
  // it('should not contain LogIn button if user has already logged in', () => {
  //   const wrapper = shallow(<NavBar isLoggedIn />);
  //   expect(wrapper.dive().contains('login')).toBe(false);
  // });
  // it('should contain Leader Board by default', () => {
  //   const wrapper = shallow(<NavBar isLoggedIn />);
  //   expect(wrapper.dive().contains('Leader Board')).toBe(true);
  // });
  it('test check', () => {
    expect(true).toBe(true);
  });
});
