import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';

import GoogleLogin from '../GoogleLogin';
import ButtonGroup from '../ButtonGroup';

const createProps = ({
  history = {}, location = {}, userContext = {}, classes = {}, closeModal = () => { }, mode = 'GameStart',
}) => ({
  history, location, userContext, classes, closeModal, mode,
});

let wrapper; let props; let shallow;

beforeEach(() => {
  props = createProps({
    history: {}, location: {}, userContext: {}, classes: {}, closeModal: () => { }, mode: 'GameStart',
  });
  shallow = createShallow({ dive: true });
  wrapper = shallow(<ButtonGroup {...props} />);
});

describe('<ButtonGroup />', () => {
  it('should exist', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render Button without login', () => {
    expect(wrapper.find(Button).length).toBe(1);
  });

  it('should render login link without login', () => {
    expect(wrapper.find(GoogleLogin).length).toBe(1);
  });


  it('should render 2 buttons after login with name single player and multi player', () => {
    props = createProps({ userContext: { isLogIn: true } });
    wrapper = shallow(<ButtonGroup {...props} />);
    const buttonText1 = 'Single Player';
    const buttonText2 = 'Multi Player';
    expect(wrapper.find(Button).length).toBe(2);
    expect(wrapper.find(Button).first().props().children).toBe(buttonText1);
    expect(wrapper.find(Button).last().props().children).toBe(buttonText2);
  });

  it('should render two button Replay and Leaderboard after login and when the game ends', () => {
    props = createProps({ userContext: { isLogIn: true }, mode: 'GameEnds' });
    wrapper = shallow(<ButtonGroup {...props} />);
    expect(wrapper.find(Button).length).toBe(2);
  });

  it('should render 2 buttons with name single player and multi player after click on replay button', () => {
    props = createProps({ userContext: { isLogIn: true }, mode: 'GameEnds' });
    wrapper = shallow(<ButtonGroup {...props} />);
    wrapper.find(Button).at(0).simulate('click');
    const buttonText1 = 'Single Player';
    const buttonText2 = 'Multi Player';
    expect(wrapper.find(Button).length).toBe(2);
    expect(wrapper.find(Button).first().props().children).toBe(buttonText1);
    expect(wrapper.find(Button).last().props().children).toBe(buttonText2);
  });
});
