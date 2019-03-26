import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import SimpleModal from '../Modal';
import ButtonGroup from '../ButtonGroup';

const createProps = ({
  history = {}, location = {}, userContext = {}, classes = {}, mode = 'GameStart',
}) => ({
  history, location, userContext, classes, mode,
});

let wrapper; let props; let shallow;

beforeEach(() => {
  props = createProps({
    history: {}, location: {}, userContext: {}, classes: {}, mode: 'GameStart',
  });
  shallow = createShallow({ dive: true });
  wrapper = shallow(<SimpleModal {...props} />);
});

describe('<SimpleModal />', () => {
  it('should exist', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render SimpleModal with props provided', () => {
    expect(wrapper.find(Modal).length).toBe(1);
  });

  it('should render two labels', () => {
    expect(wrapper.find(Typography).length).toBe(2);
  });

  it('should have a welcome label before the game start', () => {
    const firstLabel = 'Welcome to Pacman';
    const secondLabel = '';
    expect(wrapper.find(Typography).get(0).props.children).toBe(firstLabel);
    expect(wrapper.find(Typography).get(1).props.children).toBe(secondLabel);
  });

  it('should display score at the end of the game', () => {
    props = createProps({ mode: 'GameEnd' });
    wrapper = shallow(<SimpleModal {...props} />);
    const firstLabel = /Your Final Score is:/;
    const secondLabel = /SignIn to save your score/;
    expect(wrapper.find(Typography).get(0).props.children).toMatch(firstLabel);
    expect(wrapper.find(Typography).get(1).props.children).toMatch(secondLabel);
  });

  it('should render single buttons Group', () => {
    expect(wrapper.find(ButtonGroup).length).toBe(1);
  });
});
