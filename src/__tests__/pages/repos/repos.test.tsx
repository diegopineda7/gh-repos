import React from 'react';
import { ReposPage } from '../../../pages';
import renderer from 'react-test-renderer';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('Test Repos page', () => {
  it('render component <Repos />', () => {
    const tree = renderer.create(<ReposPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
