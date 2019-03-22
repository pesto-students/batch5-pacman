import React from 'react';
import { shallow } from 'enzyme';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import ScoreCard from '../ScoreCard';

describe('<ScoreCard />', () => {
  it('should render just one Table at a time', () => {
    const wrapper = shallow(<ScoreCard />);
    expect(wrapper.dive().find(Table).length).toBe(1);
  });
  it('should render three Rows if its not detailed scorecard', () => {
    const wrapper = shallow(<ScoreCard />);
    expect(wrapper.dive().find(TableRow).length).toBe(3);
  });
  it('should render five Rows if its detailed scorecard', () => {
    const wrapper = shallow(<ScoreCard isDetailed />);
    expect(wrapper.dive().find(TableRow).length).toBe(5);
  });
});
